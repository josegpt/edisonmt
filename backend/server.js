const http = require("http")
const axios = require("axios")
const { parseStringPromise } = require("xml2js")
const express = require("express")
const bodyParser = require("body-parser")

const app = express()
const server = http.createServer(app)
const io = require("socket.io").listen(server)
const RTMP_SECRET = process.env.RTMP_SECRET || "dev"

app.use(bodyParser.urlencoded({ extended: false }))

app.post("/auth", async (req, res) => {
  if (req.body.streamKey === RTMP_SECRET) {
    res.sendStatus(201)
  } else {
    res.sendStatus(404)
  }
})

app.get("*", (req, res) => {
  res.sendStatus(401)
})

const getStreamSubscribers = (io, stream) =>
  new Promise((resolve, reject) => {
    io.in(title).clients((err, clients) => {
      if (err) reject(err)
      resolve(clients.length)
    })
  })

io.on("connection", (socket) => {
  const refInterval = setInterval(async () => {
    try {
      const response = await axios.get("http://swag:8000/stats")
      const result = await parseStringPromise(response.data)
      const data = result.rtmp.server[0].application[0].live[0].stream
      if (data) {
        const streams = data.map(async (el) => {
          const title = el.name[0]
          const viewers = await getStreamSubscribers(io, title)
          console.log({ title, viewers })
          return { title, viewers }
        })
        socket.emit("streams", streams)
      } else {
        socket.emit("streams", [])
      }
    } catch (err) {
      socket.emit("error", err)
    }
  }, 1000)

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
