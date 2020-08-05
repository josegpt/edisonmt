import React from "react"
import Link from "next/link"
import classnames from "classnames"
import Logo from "./Logo"
import Icon from "./Icon"
import constants from "../constants.json"

function Layout({ children }) {
  return (
    <div className="flex flex-col min-h-screen font-sans antialiased text-gray-200 bg-black">
      <header className="flex items-center justify-around">
        <Logo />
        <div className="flex items-base"></div>
      </header>
      <main className="flex items-center justify-center flex-1 px-4">
        <div className="container">{children}</div>
      </main>
      <footer className="flex flex-col items-center justify-center my-1">
        <div className="flex my-4">
          <span className="mr-2 font-semibold">Siguenos</span>
          {constants.socialNetwork.map((item, i) => (
            <a
              href={item.url}
              key={i}
              target="_blank"
              rel="external"
              className={classnames("mr-4", `hover:${item.hoverColor}`)}
            >
              <Icon name={item.icon} />
            </a>
          ))}
        </div>
        <p className="text-xs text-center">
          Ningun video se encuentra alojado en nuestros servidores.
        </p>
      </footer>
    </div>
  )
}

export default Layout
