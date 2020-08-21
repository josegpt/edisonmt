import React from "react"

export function Primary({ title, subtitle }) {
  return (
    <h1 className="flex my-2 text-xl uppercase sm:text-3xl">
      <div className="flex items-center mr-4 text-xl text-gray-500 sm:text-3xl">
        <span className="relative flex w-3 h-3">
          <span className="absolute inline-flex w-full h-full bg-green-400 rounded-full opacity-75 animate-ping" />
          <span className="relative inline-flex w-3 h-3 bg-green-500 rounded-full" />
        </span>
        <span className="ml-2">{title}</span>
      </div>
      {subtitle ? <span className="text-white">{subtitle}</span> : undefined}
    </h1>
  )
}
