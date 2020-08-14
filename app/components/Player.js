import React from "react"
import axios from "axios"
import ReactPlayer from "react-player/lazy"

function Player({ url }) {
  const onPlay = async () => await axios.post("http://localhost:3000/api/play")
  const onDone = async () => await axios.post("http://localhost:3000/api/play")
  return (
    <ReactPlayer
      url={url}
      width="100%"
      height="100%"
      style={{ position: "absolute" }}
      onPlay={onPlay}
      onEnded={onDone}
      onError={onDone}
      onPause={onDone}
      controls
    />
  )
}

export default Player
