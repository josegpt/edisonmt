import db from "./nedb"

export default async (req, res) => {
  if (req.method === "POST") {
    if (req.body.streamKey === process.env.RTMP_SECRET) {
      const stream = {
        status: "live",
        title: req.body.name,
        stream: `https://edisonmt.com/hls/${req.body.name}.m3u8`,
        viewers: 0,
      }

      try {
        await db.insert(stream)
        res.status(201).send("Created")
      } catch (err) {
        res.status(404).send("Not Found")
      }
    } else {
      const count = await db.count()
      console.log(count)
      if (count > 0) await db.remove({}, { multi: true })
      res.status(404).send("Not Found")
    }
  }
}
