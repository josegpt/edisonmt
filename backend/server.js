const NodeMediaServer = require("node-media-server")
const _ = require("lodash")
const axios = require("axios")
const io = require("socket.io")

const config = {
  logType: 3,
  rtmp: {
    port: 1935,
    chunk_size: 60000,
    gop_cache: true,
    ping: 30,
    ping_timeout: 60,
  },
  http: {
    port: 8000,
    allow_origin: "*",
  },
}

const server = io.listen(5000)
const nms = new NodeMediaServer(config)
nms.run()

async function updateChannels(socket) {
  try {
    const { data } = await axios.get("http://localhost:8000/api/streams")
    socket.emit("channels", data)
  } catch (err) {
    socket.emit("channels", err)
  }
}

server.on("connection", function (socket) {
  console.log("user connected")

  socket.on("disconnect", () => console.log("user disconnected"))

  socket.on("channels", () => {
    updateChannels(socket)
  })

  nms.on("prePublish", () => {
    updateChannels(socket)
  })

  nms.on("donePublish", () => {
    updateChannels(socket)
  })

  nms.on("prePlay", () => {
    updateChannels(socket)
  })

  nms.on("donePlay", () => {
    updateChannels(socket)
  })
})
