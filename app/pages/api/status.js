import db from "./nedb"

export default async (req, res) => {
  try {
    const stream = await db.findOne({ status: "live" })
    if (!stream) {
      res.status(200).json({ status: "offline" })
    } else {
      res.status(200).json(stream)
    }
  } catch (err) {
    res.status(200).json({ status: "offline" })
  }
}
