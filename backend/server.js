const http = require("http")
const axios = require("axios")
const _ = require("lodash")
const { xml2json } = require("xml-js")
const express = require("express")
const bodyParser = require("body-parser")

const app = express()
const server = http.createServer(app)
const io = require("socket.io").listen(server)
const RTMP_SECRET = process.env.RTMP_SECRET || "dev"

app.use(bodyParser.urlencoded({ extended: false }))
app.use((req, res, next) => {
  req.io = io
  next()
})

async function fetchStreams() {
  try {
    const response = await axios.get("http://swag:8000")
    const result = xml2json(response.data, { compact: true, spaces: 2 })
    const data = JSON.parse(result)
    const streams = data.rtmp.server.application.live.stream
    return _.isArray(streams) ? streams : streams ? [streams] : []
  } catch (err) {
    return err
  }
}

app.post("/auth", async (req, res) => {
  if (req.body.streamKey === RTMP_SECRET) {
    res.sendStatus(201)
    req.io.emit("streams", await fetchStreams())
  } else {
    res.sendStatus(404)
    req.io.emit("streams", await fetchStreams())
  }
})

app.get("*", (req, res) => {
  res.sendStatus(401)
})

let activeUsers = 0
io.on("connection", (socket) => {
  activeUsers++
  console.log(`Connected socket ${socket.id} - ${activeUsers}`)

  socket.on("disconnect", () => {
    activeUsers--
    console.log(`Disconnected socket ${socket.id} ${activeUsers}`)
  })

  socket.on("streams", async () => {
    socket.emit("streams", await fetchStreams())
  })
})

server.listen(3000, () => {
  console.log("Server started at http://localhost:3000")
})
