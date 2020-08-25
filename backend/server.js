const express = require("express")
const bodyParser = require("body-parser")

const app = express()
const RTMP_SECRET = process.env.RTMP_SECRET || "dev"

app.use(bodyParser.urlencoded({ extended: false }))

app.post("/auth", (req, res) => {
  if (req.body.streamKey === RTMP_SECRET) {
    res.sendStatus(201)
  } else {
    res.sendStatus(404)
  }
})

app.get("*", (req, res) => {
  res.sendStatus(401)
})

app.listen(3000, () => {
  console.log("Server started at http://localhost:3000")
})
