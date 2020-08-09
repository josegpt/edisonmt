import React from "react"
import Link from "next/link"
import c from "../helpers"

function Logo() {
  return (
    <Link href="/">
      <a className="py-4">
        <img src={c("logoSmall")} alt={c("brand")} className="h-10 sm:hidden" />
        <img
          src={c("logoBig")}
          alt={c("brand")}
          className="hidden h-20 sm:block"
        />
      </a>
    </Link>
  )
}

export default Logo
