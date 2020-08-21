const NodeMediaServer = require("node-media-server")
const _ = require("lodash")
const axios = require("axios")
const io = require("socket.io")

const USER = process.env.RTMP_USER || "dev"
const PASS = process.env.RTMP_PASS || "dev"
const SECRET = process.env.RTMP_SECRET || "dev"

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
    api: true,
    api_user: USER,
    api_pass: PASS,
  },
}

const server = io.listen(5000)
const nms = new NodeMediaServer(config)
nms.run()

async function updateChannels() {
  try {
    const { data } = await axios.get("http://localhost:8000/api/streams", {
      auth: {
        username: USER,
        password: PASS,
      },
    })
    server.emit("channels", data)
  } catch (err) {
    server.emit("channels", err)
  }
}

server.on("channels", () => {
  updateChannels(socket)
})

nms.on("prePublish", (id, _, args) => {
  const session = nms.getSession(id)
  if (!args.streamKey || args.streamKey !== SECRET) {
    session.reject()
  } else {
    updateChannels()
  }
})

nms.on("donePublish", () => {
  updateChannels()
})

nms.on("prePlay", () => {
  updateChannels()
})

nms.on("donePlay", () => {
  updateChannels()
})
