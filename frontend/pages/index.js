import axios from "axios"
import c from "../helpers"
import Transmission from "../components/Transmission"

function Home({ transmissions, server }) {
  if (transmissions === null) {
    return <Transmission status={c("offline")} />
  }

  return Object.keys(transmissions).map((live) => (
    <Transmission
      key={live}
      status={c("live")}
      watching={transmissions[live]["subscribers"].length}
      stream={live}
      src={`${server}/live/${live}.flv`}
    />
  ))
}

export async function getStaticProps() {
  const authString = Buffer.from(
    `${process.env.API_USER}:${process.env.API_PASSWORD}`
  )
  let response
  try {
    response = await axios.get(`${c("apiServer")}/api/streams`, {
      headers: {
        Authorization: `Basic ${authString.toString("base64")}`,
      },
    })
  } catch (err) {
    console.log(err)
  }

  return {
    props: {
      transmissions: (response && response.data && response.data.live) || null,
      server: process.env.API_SERVER,
    },
  }
}

export default Home
