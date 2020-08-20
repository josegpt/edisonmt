import { useEffect, useRef } from "react"
import io from "socket.io-client"

export default function useSocket() {
  const socket = useRef(null)

  useEffect(() => {
    socket.current = io("wss://api.edisonmt.com")

    return () => {
      socket.current.off()
      socket.current.disconnect()
    }
  }, [])

  return socket
}
