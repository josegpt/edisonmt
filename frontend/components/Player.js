import React from "react"
import ReactPlayer from "react-player/lazy"

function Player({ src }) {
  return <ReactPlayer url={src} height="100%" width="100%" controls />
}

export default Player
