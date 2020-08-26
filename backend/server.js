const http = require("http")
const axios = require("axios")
const _ = require("lodash")
const { parseStringPromise } = require("xml2js")
const express = require("express")
const bodyParser = require("body-parser")
const { add } = require("lodash")

const app = express()
const server = http.createServer(app)
const io = require("socket.io").listen(server)
const RTMP_SECRET = process.env.RTMP_SECRET || "dev"

app.use(bodyParser.urlencoded({ extended: false }))

function createInMemoryDB() {
  let streams = {}

  console.log(streams)

  return {
    createStream: (stream) => {
      streams[stream] = []
    },
    addSocket: (stream, socketId) => {
      streams[stream].push(socketId)
    },
    removeSocket: (stream, socketId) => {
      const index = treams[stream].indexOf(socketId)
      if (index > -1) {
        streams.splice(index, 1)
      }
    },
    countStreamSubscribers: (stream) => streams[stream].length,
    existStream: (stream) => Object.keys(streams).includes(stream),
    reset: () => {
      streams = {}
    },
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
  console.log(req.body)
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
    console.log(`Disconnected socket ${socket.id}`)
  })
})

server.listen(3000, () => {
  console.log("Server started at http://localhost:3000")
})
