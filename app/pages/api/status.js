import axios from "axios"
import { parseString } from "xml2js"
import c from "../../helpers"

export default async (req, res) => {
  res.statusCode = 200
  res.setHeader("Content-Type", "application/json")
  try {
    const response = await axios.get(`${c("rtmpServer")}/stats`)
    parseString(response.data, (err, { rtmp }) => {
      if (err) res.json({ status: "offline" })
      const streamName = rtmp.server[0].application[0].live[0].stream[0].name[0]
      res.json({
        status: "live",
        title: streamName,
        stream: `http://edisonmt.com/hls/${streamName}.m3u8`,
      })
    })
  } catch (err) {
    res.json({ status: "offline" })
  }
}
