import React from "react"
import Card from "./Card"
import { Primary } from "./Typography"

function Transmission({ title, streams }) {
  return (
    <section className="flex-1 px-4">
      <div className="container mx-auto">
        <Primary title={title} />

        <main className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
          {streams.map(({ publisher, subscribers }) => {
            return (
              <Card
                key={publisher.clientId}
                href="/stream/[...slug]"
                as={`/stream/${publisher.app}/${publisher.stream}`}
                title={publisher.stream}
                viewers={subscribers.length}
              />
            )
          })}
        </main>
      </div>
    </section>
  )
}

export default Transmission
