const RTMP_SECRET = process.env.RTMP_SECRET || "dev"

function authStream(req, res) {
  if (req.body.streamKey === RTMP_SECRET) {
    res.sendStatus(201)
  } else {
    res.sendStatus(404)
  }
}

function notAuthenticated(req, res) {
  res.sendStatus(401)
}

module.exports = Object.assign({}, { authStream, notAuthenticated })
