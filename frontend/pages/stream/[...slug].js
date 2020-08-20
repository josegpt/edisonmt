import _ from "lodash"
import { useRouter } from "next/router"
import { useState, useEffect } from "react"
import useSocket from "../../hooks/useSocket"
import Player from "../../components/Player"
import Loader from "../../components/Loader"
import { Primary } from "../../components/Typography"

function Stream() {
  const [channels, setChannels] = useState({})
  const router = useRouter()
  const socket = useSocket()

  useEffect(() => {
    if (!socket.current) return
    socket.current.emit("channels", router.query.slug)
    socket.current.on("channels", (payload) => {
      setChannels(payload)
    })
  }, [socket.current])

  if (_.isEmpty(channels)) {
    return <Loader />
  }

  const [channel, stream] = router.query.slug
  const { publisher, subscribers } = channels[channel][stream]

  return (
    <section className="flex items-center flex-1 px-4">
      <div className="container mx-auto">
        <Primary
          title={`${publisher.app} ${subscribers.length}`}
          subtitle={publisher.stream}
        />

        <main className="relative pb-1/3">
          <Player
            url={`https://flv.edisonmt.com/${publisher.app}/${publisher.stream}.flv`}
          />
        </main>
      </div>
    </section>
  )
}

export default Stream
