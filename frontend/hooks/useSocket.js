import { useEffect, useRef } from "react"
import io from "socket.io-client"

export default function useSocket() {
  const socket = useRef(null)

  useEffect(() => {
    socket.current = io("http://backend:5000")

    return () => {
      socket.current.off()
      socket.current.disconnect()
    }
  }, [])

  return socket
}
