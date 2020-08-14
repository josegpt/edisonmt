import React from "react"
import Head from "next/head"
import Logo from "./Logo"
import SocialNetwork from "./SocialNetwork"

function Layout({ children }) {
  return (
    <div className="flex flex-col min-h-screen font-sans antialiased text-gray-200 bg-black">
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1.0" />
        <meta name="theme-color" content="#D0021B" />
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <title>EdisonMT</title>
      </Head>
      <header className="flex items-center justify-center">
        <Logo />
      </header>
      <main className="flex items-center flex-1">{children}</main>
      <footer className="flex flex-col items-center justify-center my-1">
        <SocialNetwork />
        <p className="text-xs text-center">
          Ningun video se encuentra alojado en nuestros servidores.
        </p>
      </footer>
    </div>
  )
}

export default Layout
