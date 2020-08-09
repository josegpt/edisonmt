import React from "react"
import ReactPlayer from "react-player/lazy"

function Player({ url }) {
  return <ReactPlayer url={url} width="100%" height="100%" style={{ position: "absolute" }} controls />
}

export default Player
