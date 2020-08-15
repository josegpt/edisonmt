import { useState } from "react"
import useSocket from "../hooks/useSocket"
import Transmission from "../components/Transmission"

function Index() {
  const [channels, setChannels] = useState([])
  const socket = useSocket("channels", (payload) => {
    setChannels(payload)
  })
  socket.emit("init")

  if (channels.length === 0) {
    return (
      <section className="flex items-center justify-center flex-1">
        <h1 className="flex justify-center text-3xl capitalize">
          <div className="flex items-center text-3xl">
            <span className="relative flex w-3 h-3">
              <span className="absolute inline-flex w-full h-full bg-red-400 rounded-full opacity-75 animate-ping" />
              <span className="relative inline-flex w-3 h-3 bg-red-500 rounded-full" />
            </span>
            <span className="ml-2">Desconectado</span>
          </div>
        </h1>
      </section>
    )
  }

  return channels.map((channel) => (
    <Transmission
      key={channel.title}
      title={channel.title}
      streams={channel.streams}
    />
  ))
}

export default Index
