const socketIO = require("socket.io")

function createWebsocketServer(server) {
  const io = socketIO.listen(server)

  return {
    listen: () => io,
    subscribers: (stream) =>
      new Promise((resolve, reject) => {
        io.in(stream).clients((err, clients) => {
          if (err) reject(err)
          resolve(clients.length)
        })
      }),
  }
}

module.exports = Object.assign({}, { createWebsocketServer })
