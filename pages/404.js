import Link from "next/link"

function Custom404() {
  return (
    <section className="flex flex-col items-center justify-center">
      <h1 className="flex my-2 text-3xl capitalize">
        <div className="flex items-center mr-4 text-3xl text-gray-200">
          <span className="relative flex w-3 h-3">
            <span className="absolute inline-flex w-full h-full bg-red-400 rounded-full opacity-75 animate-ping"></span>
            <span className="relative inline-flex w-3 h-3 bg-red-500 rounded-full"></span>
          </span>
          <span className="ml-2">
            <span className="text-red-500">404</span> &mdash; Parece que lo que
            buscabas no esta disponible
          </span>
        </div>
      </h1>
      <Link href="/">
        <a className="text-xl text-blue-500 capitalize">Regresar</a>
      </Link>
    </section>
  )
}

export default Custom404
