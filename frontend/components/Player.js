import React, { useEffect, useRef } from "react"

function Player({ url }) {
  const player = useRef(null)

  useEffect(() => {
    const { default: flvjs } = require("flv.js")

    if (player && player.current && flvjs.isSupported()) {
      const flvPlayer = flvjs.createPlayer(
        {
          isLive: true,
          hasVideo: true,
          hasAudio: true,
          type: "flv",
          url,
        },
        { enableStashBuffer: true, stashInitialSize: 128 }
      )
      flvPlayer.attachMediaElement(player.current)
      flvPlayer.load()

      return () => {
        flvPlayer.unload()
        flvPlayer.detachMediaElement(player.current)
        flvPlayer.destroy()
      }
    }
  }, [url])

  return (
    <video
      ref={player}
      className="w-full h-full"
      style={{ position: "absolute" }}
      controls
    />
  )
}

export default Player
