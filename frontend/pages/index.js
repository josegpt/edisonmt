import _ from "lodash"
import { useState, useEffect } from "react"
import Loader from "../components/Loader"
import useSocket from "../hooks/useSocket"
import Transmission from "../components/Transmission"

function Index() {
  const [channels, setChannels] = useState({ isLoading: true, data: {} })
  const socket = useSocket()

  useEffect(() => {
    if (!socket.current) return
    setChannels((channels) => ({ ...channels, isLoader: true }))
    socket.current.emit("channels")
    socket.current.on("channels", (payload) => {
      setChannels(() => ({ data: { ...payload }, isLoading: false }))
    })
  }, [socket.current])

  if (channels.isLoading) {
    return <Loader />
  }

  if (_.isEmpty(channels.data)) {
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

  return (
    <main className="flex-1">
      {Object.keys(channels.data).map((channel) => (
        <Transmission
          key={channel}
          title={channel}
          streams={channels.data[channel]}
        />
      ))}
    </main>
  )
}

export default Index
