export default (req, res) => {
  if (req.method === "POST") {
    if (req.body.streamKey === process.env.RTMP_SECRET) {
      res.status(201).send("Created")
    } else {
      res.status(404).send("Not Found")
    }
  }
}
