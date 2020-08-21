import _ from "lodash"
import Loader from "../components/Loader"
import useSocket from "../hooks/useSocket"
import Transmission from "../components/Transmission"
import { FETCH_CHANNELS_REQUEST, FETCH_CHANNELS_SUCCESS } from "../store"

function Index({ state, dispatch }) {
  useSocket("channels", (payload) => {
    dispatch({ type: FETCH_CHANNELS_REQUEST })
    dispatch({ type: FETCH_CHANNELS_SUCCESS, payload })
  })

  console.log(state)
  if (state.isLoading) {
    return <Loader />
  }

  if (_.isEmpty(state.data) || state.error) {
    return (
      <section className="flex items-center justify-center flex-1">
        <h1 className="flex justify-center text-3xl capitalize">
          <div className="flex items-center text-3xl">
            <span className="relative flex w-3 h-3">
              <span className="absolute inline-flex w-full h-full bg-red-400 rounded-full opacity-75 animate-ping" />
              <span className="relative inline-flex w-3 h-3 bg-red-500 rounded-full" />
            </span>
            <span className="ml-2 text-2xl font-semibold sm:text-3xl">
              Desconectado
            </span>
          </div>
        </h1>
      </section>
    )
  }

  return (
    <main className="flex-1">
      {Object.keys(state.data).map((channel) => (
        <Transmission
          key={channel}
          title={channel}
          streams={state.data[channel]}
        />
      ))}
    </main>
  )
}

export default Index
