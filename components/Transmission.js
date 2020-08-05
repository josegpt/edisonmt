import React from "react"
import Player from "./Player"

function Transmission({ status, watching, stream, src }) {
  if (status === "desconectado") {
    return (
      <section className="flex flex-col items-center">
        <h1 className="flex my-2 text-3xl capitalize">
          <div className="flex items-center mr-4 text-3xl text-gray-600">
            <span className="relative flex w-3 h-3">
              <span className="absolute inline-flex w-full h-full bg-red-400 rounded-full opacity-75 animate-ping"></span>
              <span className="relative inline-flex w-3 h-3 bg-red-500 rounded-full"></span>
            </span>
            <span className="ml-2">{status}</span>
          </div>
        </h1>
      </section>
    )
  }
  return (
    <section className="flex flex-col">
      <h1 className="flex my-2 text-3xl capitalize">
        <div className="flex items-center mr-4 text-3xl text-gray-600">
          <span className="relative flex w-3 h-3">
            <span className="absolute inline-flex w-full h-full bg-green-400 rounded-full opacity-75 animate-ping"></span>
            <span className="relative inline-flex w-3 h-3 bg-green-500 rounded-full"></span>
          </span>
          <span className="ml-2">
            {status} {watching}
          </span>
        </div>
        <span>{stream}</span>
      </h1>

      <main>
        <Player src={src} />
      </main>
    </section>
  )
}

export default Transmission
