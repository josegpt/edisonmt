import React from "react"
import Link from "next/link"

function Card({ href, as, title, viewers }) {
  return (
    <Link href={href} as={as}>
      <a className="relative block px-4 py-12 text-center text-gray-500 bg-gray-800 rounded hover:text-gray-600 hover:bg-gray-900">
        <span className="text-2xl font-semibold capitalize">{title}</span>
        <span className="absolute top-0 right-0 p-4 text-xs font-semibold lowercase">
          {viewers} {viewers === 1 ? "espectador" : "espectadores"}
        </span>
      </a>
    </Link>
  )
}

export default Card
