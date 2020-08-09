import axios from "axios"
import c from "../helpers"
import Player from "../components/Player"

function Home({ data }) {
  if (data === null || data.status === "offline" || data.status === undefined) {
    return (
      <section className="flex-1">
        <h1 className="flex justify-center text-3xl capitalize">
          <div className="flex items-center mr-4 text-3xl">
            <span className="relative flex w-3 h-3">
              <span className="absolute inline-flex w-full h-full bg-red-400 rounded-full opacity-75 animate-ping" />
              <span className="relative inline-flex w-3 h-3 bg-red-500 rounded-full" />
            </span>
            <span className="ml-2">{c("offline")}</span>
          </div>
        </h1>
      </section>
    )
  }

  return (
    <section className="flex-1 px-4">
      <h1 className="flex my-2 text-3xl capitalize">
        <div className="flex items-center mr-4 text-3xl text-gray-500">
          <span className="relative flex w-3 h-3">
            <span className="absolute inline-flex w-full h-full bg-green-400 rounded-full opacity-75 animate-ping" />
            <span className="relative inline-flex w-3 h-3 bg-green-500 rounded-full" />
          </span>
          <span className="ml-2">
            {c(data.status)} {data.viewers}
          </span>
        </div>
        <span>{data.title}</span>
      </h1>

      <main className="relative pb-1/3">
        <Player url={data.stream} />
      </main>
    </section >
  )
}

export async function getServerSideProps() {
  let response = null
  try {
    response = await axios.get(`${c("apiServer")}/api/status`)
  } catch (err) {
    if (process.env.NODE_ENV === "production") {
      console.log("500: Network Error")
    } else {
      console.log(err)
    }
  }

  return {
    props: {
      data: response && response.data,
    },
  }
}

export default Home
