import { Server } from "http"
import Express from "express"
import compression from "compression"
import ws from "socket.io"
import * as sapper from "@sapper/server"

const { PORT } = process.env
const app = Express()
const server = Server(app)
const io = ws(server)

app.use(Express.urlencoded({ extended: false }))

app.use(compression({ threshold: 0 }))
app.use(Express.static("static"))

app.post("/auth", (req, res) => {
  if (req.body.streamKey === "123") {
    res.sendStatus(201)
  } else {
    res.sendStatus(404)
  }
})

app.use(sapper.middleware())

server.listen(PORT, (err) => {
  if (err) throw err
  console.log(`> Ready on http://localhost:3000`)
})
