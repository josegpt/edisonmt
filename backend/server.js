const NodeMediaServer = require('node-media-server')

const config = {
  logType: 3,
  rtmp: {
    port: 1935,
    chunk_size: 60000,
    gop_cache: true,
    ping: 30,
    ping_timeout: 60,
  },
  http: {
    port: 5000,
    allow_origin: '*',
    api: true,
  },
  auth: {
    api: true,
    api_user: process.env.API_USER,
    api_pass: process.env.API_PASSWORD,
    publish: true,
    secret: process.env.API_SECRET,
  },
}

let nms = new NodeMediaServer(config)
nms.run()
