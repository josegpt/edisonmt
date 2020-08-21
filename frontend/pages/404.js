import Link from "next/link"

function Custom404() {
  return (
    <section className="flex flex-col items-center justify-center flex-1 capitalize">
      <h1 className="flex">
        <div className="flex items-center mr-4 text-gray-200">
          <span className="relative flex w-3 h-3">
            <span className="absolute inline-flex w-full h-full bg-red-400 rounded-full opacity-75 animate-ping" />
            <span className="relative inline-flex w-3 h-3 bg-red-500 rounded-full" />
          </span>
          <span className="text-6xl text-red-500">404</span>
        </div>
      </h1>
      <span className="text-xl">pagina no disponible</span>
      <Link href="/">
        <a className="text-xl text-blue-500 ">Pagina Inicio</a>
      </Link>
    </section>
  )
}

export default Custom404
