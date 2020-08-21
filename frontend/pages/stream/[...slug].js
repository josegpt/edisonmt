import _ from "lodash"
import { useRouter } from "next/router"
import Link from "next/link"
import useSocket from "../../hooks/useSocket"
import Player from "../../components/Player"
import Loader from "../../components/Loader"
import { Primary } from "../../components/Typography"
import { FETCH_CHANNELS_REQUEST, FETCH_CHANNELS_SUCCESS } from "../../store"

function Stream({ state, dispatch }) {
  const router = useRouter()

  useSocket("channels", (payload) => {
    dispatch({ type: FETCH_CHANNELS_REQUEST })
    dispatch({ type: FETCH_CHANNELS_SUCCESS, payload })
  })

  if (state.isLoading) {
    return <Loader />
  }

  if (_.isEmpty(state.data) || state.error) {
    return (
      <section className="flex flex-col items-center justify-center flex-1 capitalize">
        <h1 className="flex">
          <div className="flex items-center mr-4 text-gray-200">
            <span className="relative flex w-3 h-3">
              <span className="absolute inline-flex w-full h-full bg-red-400 rounded-full opacity-75 animate-ping" />
              <span className="relative inline-flex w-3 h-3 bg-red-500 rounded-full" />
            </span>
            <span className="ml-2 text-xl font-semibold sm:text-3xl">
              transmision terminada
            </span>
          </div>
        </h1>
        <Link href="/">
          <a className="text-xl text-blue-500 ">inicio</a>
        </Link>
      </section>
    )
  }

  const [channel, stream] = router.query.slug
  const { publisher, subscribers } = state.data[channel][stream]

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
