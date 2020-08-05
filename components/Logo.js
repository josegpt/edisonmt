import React from "react"
import Link from "next/link"

function Logo() {
  return (
    <Link href="/">
      <a className="py-4">
        <img
          src="/img/EMT, Name@4x.png"
          alt="EdisonMT logo"
          className="h-10 sm:hidden"
        />
        <img
          src="/img/EMT, Side Logo@4x.png"
          alt="EdisonMT logo"
          className="hidden h-20 sm:block"
        />
      </a>
    </Link>
  )
}

export default Logo
