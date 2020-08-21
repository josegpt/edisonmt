import { useReducer } from "react"
import "../styles/main.css"
import Layout from "../components/Layout"
import reducer, { initialState } from "../store"

function MyApp({ Component, pageProps }) {
  const [state, dispatch] = useReducer(reducer, initialState)
  return (
    <Layout>
      <Component {...pageProps} state={state} dispatch={dispatch} />
    </Layout>
  )
}

export default MyApp
