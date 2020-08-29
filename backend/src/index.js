const http = require("http")
const R = require("rambda")
const express = require("express")
const bodyParser = require("body-parser")
const { asyncPipe } = require("./helpers/fp")
const { fetchStreams } = require("./service/stream")
const { authStream, notAuthenticated } = require("./service/auth")

const app = express()
const server = http.createServer(app)
const io = require("socket.io").listen(server)

app.use(bodyParser.urlencoded({ extended: false }))
app.post("/auth", authStream)
app.get("*", notAuthenticated)

const getStreamSubscribers = (stream) =>
  new Promise((resolve, reject) => {
    io.in(stream).clients((err, clients) => {
      if (err) reject(err)
      resolve(clients.length)
    })
  })

const getStreamsSubscribers = R.map(async (stream) => ({
  title: stream,
  viewers: await getStreamSubscribers(stream),
}))

const streams = () => fetchStreams("http://swag:8000/stats")
const fetchStreamsViewers = asyncPipe(streams, getStreamsSubscribers)

io.on("connection", (socket) => {
  const refInterval = setInterval(async () => {
    try {
      const response = await fetchStreamsViewers()
      const streams = await Promise.all(response)
      socket.emit("streams", streams)
    } catch (error) {
      socket.emit("error", error)
    }
  }, 800)

  socket.on("joinStream", (stream) => {
    socket.join(stream)
  })

  socket.on("leaveStream", (stream) => {
    socket.leave(stream)
  })

  socket.on("disconnect", () => {
    clearInterval(refInterval)
  })
})

server.listen(3000, () => {
  console.log("Server started at http://localhost:3000")
})
