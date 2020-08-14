import db from "./nedb"

export default async (req, res) => {
  if (req.method === "POST") {
    const count = await db.count()
    if (count > 0) await db.remove({}, { multi: true })
    res.status(200).json({ status: "offline" })
  }
}
