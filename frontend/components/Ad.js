import React, { useEffect } from "react"

function Ad({ adKey, height, width }) {
  useEffect(() => {
    document.write(
      `<script type="text/javascript" src="http${
        location.protocol === "https" ? "s" : ""
      }://www.highprofitnetwork.com/${adKey}/invoke.js"></script>`
    )
  })

  return <iframe key={adKey} height={height} width={width}></iframe>
}

export default Ad
