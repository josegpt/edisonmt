import React, { useEffect } from "react"
import Head from "next/head"
import Logo from "./Logo"
import SocialNetwork from "./SocialNetwork"
import Ad from "./Ad"

function Layout({ children }) {
  return (
    <div className="flex flex-col min-h-screen font-sans antialiased text-gray-200 bg-black">
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1.0" />
        <meta name="theme-color" content="#D0021B" />
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <title>EdisonMT</title>
        <script
          type="text/javascript"
          src="//pl15746103.cpmgatenetwork.com/d2/53/92/d25392d89298a7ea2093e2c1561ac549.js"
        ></script>
      </Head>
      <header className="flex items-center justify-center">
        <Logo />
      </header>
      <main className="flex items-center flex-1">{children}</main>
      <footer className="flex flex-col items-center justify-center my-1">
        <Ad adKey="cdf1efd472c04eee066a067407137863" height={90} width={728} />
        <SocialNetwork />
        <p className="text-xs text-center">
          Ningun video se encuentra alojado en nuestros servidores.
        </p>
      </footer>
    </div>
  )
}

export default Layout
