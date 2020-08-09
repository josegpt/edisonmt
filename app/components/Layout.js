import React from "react"
import Head from "next/head"
import Logo from "../components/Logo"
import Icon from "../components/Icon"
import c from "../helpers"

function Layout({ children }) {
  return (
    <div className="flex flex-col min-h-screen font-sans antialiased text-gray-200 bg-black">
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1.0" />
        <meta name="theme-color" content="#D0021B" />
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <title>{c("brand")}</title>
      </Head>
      <header className="flex items-center justify-center">
        <Logo />
      </header>
      <main className="flex items-center justify-center flex-1 px-4">
        <div className="container">{children}</div>
      </main>
      <footer className="flex flex-col items-center justify-center my-1">
        <div className="flex my-4">
          <span className="mr-2 font-semibold capitalize">{c("followUs")}</span>

          {c("socialNetwork").map((item, i) => (
            <a
              key={i}
              href={item.url}
              target="_blank"
              rel="external"
              className="mr-4 hover:{item.hoverColor}"
            >
              <Icon name={item.icon} />
            </a>
          ))}
        </div>
        <p className="text-xs text-center">{c("notice")}</p>
      </footer>
    </div>
  )
}

export default Layout
