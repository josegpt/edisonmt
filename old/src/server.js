import Express from "express"
import compression from "compression"
import * as sapper from "@sapper/server"

const { PORT } = process.env
const app = Express()

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

app.get("/status", (req, res) => {
  res.json({ status: "offline" })
})

app.use(sapper.middleware())

app.listen(PORT, (err) => {
  if (err) throw err
  console.log(`> Ready on http://localhost:3000`)
})
