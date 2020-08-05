import axios from "axios"
import Transmission from "../components/Transmission"

function Home({ transmissions, server }) {
  if (transmissions === null) {
    return <Transmission status="desconectado" />
  }

  return Object.keys(transmissions).map((live) => (
    <Transmission
      key={live}
      status="en vivo"
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
  const response = await axios.get(`${process.env.API_SERVER}/api/streams`, {
    headers: {
      Authorization: `Basic ${authString.toString("base64")}`,
    },
  })

  return {
    props: {
      transmissions: (response && response.data && response.data.live) || null,
      server: process.env.API_SERVER,
    },
  }
}

export default Home
