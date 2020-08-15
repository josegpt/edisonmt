const NodeMediaServer = require("node-media-server")
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
  auth: {
    publish: true,
    secret: "nodemedia2017privatekey",
  },
}

const server = io.listen(5000)
const nms = new NodeMediaServer(config)
nms.run()

function transformResponse(response) {
  const channels = Object.keys(response)
  const streams = channels.map((channel) => {
    const streams = Object.keys(response[channel]).map(
      (stream) => response[channel][stream]
    )
    return { title: channel, streams }
  }, [])

  return streams
}

async function updateChannels(socket) {
  try {
    const { data } = await axios.get("http://localhost:8000/api/streams")
    socket.emit("channels", transformResponse(data))
  } catch (err) {
    socket.emit("channels", err)
  }
}

async function updateStream(socket, payload) {
  try {
    const { data } = await axios.get("http://localhost:8000/api/streams")
    const stream = data[payload[0]][payload[1]]
    socket.emit("stream", stream)
  } catch (err) {
    socket.emit("stream", err)
  }
}

server.on("connection", function (socket) {
  console.log("user connected")

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

  socket.on("init", () => {
    updateChannels(socket)
  })

  socket.on("stream", (payload) => {
    updateStream(socket, payload)
  })
})
