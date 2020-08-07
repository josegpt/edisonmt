import { Server } from "http"
import Express from "express"
import compression from "compression"
import bodyParser from "body-parser"
import ws from "socket.io"
import * as sapper from "@sapper/server"

const { PORT } = process.env
const app = Express()
const server = Server(app)
const io = ws(server)

app.use(bodyParser.urlencoded({ extended: false }))

app.use(compression({ threshold: 0 }))
app.use(Express.static("static"))

app.use((req, res, next) => {
  req.io = io
  next()
})

let stream = {
  status: "offline",
}

io.on("connection", (socket) => {
  socket.emit("status", stream)
})

app.post("/auth", (req, res) => {
  if (req.body.streamKey === "123") {
    res.sendStatus(201)
    stream = {
      ...stream,
      status: "live",
      title: req.body.name,
      viewers: 0,
    }
    req.io.emit("status", stream)
  } else {
    res.sendStatus(404)
  }
})

app.get("/done", (req, res) => {
  if (stream.status === "live") {
    stream = {
      ...stream,
      status: "offline",
    }
    req.io.emit("status", stream)
  }
  res.json(stream.status)
})

app.get("/addViewer", (req, res) => {
  if (stream.status === "live") {
    stream.viewers += 1
    req.io.emit("status", stream)
  }
  res.json(stream.status)
})

app.get("/removeViewer", (req, res) => {
  if (stream.status === "live" && stream.viewers > 0) {
    stream.viewers -= 1
    req.io.emit("status", stream)
  }
  res.json(stream.status)
})

app.use(sapper.middleware())

server.listen(PORT, (err) => {
  if (err) throw err
  console.log(`> Ready on http://localhost:3000`)
})
