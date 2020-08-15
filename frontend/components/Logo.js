import React from "react"
import Link from "next/link"

function Logo() {
  return (
    <Link href="/">
      <a className="py-4">
        <img
          src="/img/name-logo.png"
          alt="EdisonMT"
          className="h-10 sm:hidden"
        />
        <img
          src="/img/side-logo.png"
          alt="EdisonMT"
          className="hidden h-20 sm:block"
        />
      </a>
    </Link>
  )
}

export default Logo
