import { useEffect, useRef } from "react"
import io from "socket.io-client"

export default function useSocket(eventName, cb) {
  const socket = useRef(null)

  useEffect(() => {
    socket.current = io("https://api.edisonmt.com")
    socket.current.on(eventName, cb)

    return () => {
      socket.current.off(eventName, cb)
      socket.current.close()
    }
  }, [])

  return socket
}
