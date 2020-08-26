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

function createInMemoryDB() {
  let streams = {}

  return {
    createStream: (stream) => {
      streams[stream] = []
    },
    addSocket: (stream, socketId) => {
      streams[stream].push(socketId)
    },
    findByTitle(stream) {
      if (this.existStream(stream)) {
        return streams[stream]
      }

      return null
    },
    removeSocket: (stream, socketId) => {
      const index = streams[stream].indexOf(socketId)
      if (index > -1) {
        streams[stream].splice(index, 1)
      }
    },
    removeSocketFromAllStreams(socketId) {
      const allStreams = Object.keys(streams)
      if (allStreams.length > 0) {
        allStreams.forEach((stream) => this.removeSocket(stream, socketId))
      }
    },
    removeStream: (stream) => {
      delete streams[stream]
    },
    countStreamSubscribers: (stream) => streams[stream].length || 0,
    existStream: (stream) => Object.keys(streams).includes(stream),
  }
}

const db = createInMemoryDB()
async function fetchStreams() {
  try {
    const response = await axios.get("http://swag:8000/stats")
    const result = await parseStringPromise(response.data)
    const data = result.rtmp.server[0].application[0].live[0].stream
    if (data) {
      return data.map((el) => {
        const title = el.name[0]
        console.log(db.findByTitle(title))
        return { title, viewers: db.countStreamSubscribers(title) }
      })
    } else {
      return []
    }
  } catch (err) {
    return err
  }
}

app.post("/auth", async (req, res) => {
  if (req.body.streamKey === RTMP_SECRET) {
    res.sendStatus(201)
    db.createStream(req.body.name)
  } else {
    res.sendStatus(404)
  }
})

app.post("/done", (req, res) => {
  if (db.existStream(req.body.name)) {
    db.removeStream(req.body.name)
  }
})

app.get("*", (req, res) => {
  res.sendStatus(401)
})

io.on("connection", (socket) => {
  console.log(`Connected socket ${socket.id}`)

  const refInterval = setInterval(async () => {
    socket.emit("streams", await fetchStreams())
  }, 1000)

  socket.on("joinStream", (stream) => {
    if (db.existStream(stream)) {
      db.addSocket(stream)
      socket.join(stream)
    }
  })

  socket.on("leaveStream", (stream) => {
    if (db.existStream(stream)) {
      db.removeSocket(stream)
      socket.leave(stream)
    }
  })

  socket.on("disconnect", () => {
    clearInterval(refInterval)
    db.removeSocketFromAllStreams(socket.id)
    console.log(`Disconnected socket ${socket.id}`)
  })
})

server.listen(3000, () => {
  console.log("Server started at http://localhost:3000")
})
