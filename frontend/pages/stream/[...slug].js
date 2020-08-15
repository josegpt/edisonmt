import { useState } from "react"
import { useRouter } from "next/router"
import useSocket from "../../hooks/useSocket"
import Player from "../../components/Player"
import { Primary } from "../../components/Typography"

function Stream() {
  const [stream, setStream] = useState({})
  const router = useRouter()
  const socket = useSocket("stream", (payload) => {
    setStream(payload)
  })
  socket.emit("stream", router.query.slug)

  if (Object.keys(stream).length === 0) {
    return <h1>Loading...</h1>
  }

  return (
    <section className="flex items-center flex-1 px-4">
      <div className="container mx-auto">
        <Primary
          title={`${stream.publisher.app} ${stream.subscribers.length}`}
          subtitle={stream.publisher.stream}
        />

        <main className="relative pb-1/3">
          <Player
            url={`http://10.0.0.103:8000/${stream.publisher.app}/${stream.publisher.stream}.flv`}
          />
        </main>
      </div>
    </section>
  )
}

export default Stream
