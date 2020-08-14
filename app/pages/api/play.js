import db from "./nedb"

export default async (req, res) => {
  if (req.method === "POST") {
    try {
      const stream = await db.findOne({ status: "live" })
      await db.update({ _id: stream._id }, { $inc: { viewers: 1 } }, {})
      res.status(200).json({ status: stream.status })
    } catch (err) {
      res.status(200).json({ status: "offline" })
    }
  }
}
