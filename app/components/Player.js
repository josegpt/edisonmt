import React, { useEffect } from "react"
import axios from "axios"
import ReactPlayer from "react-player/lazy"

function Player({ url }) {
  const apiServer = "https://edisonmt.com"
  const onPlay = () => axios.post(`${apiServer}/api/play`)
  const onDone = () => axios.post(`${apiServer}/api/playDone`)

  useEffect(() => {
    return () => onDone()
  })

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
