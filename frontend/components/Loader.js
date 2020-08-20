import React from "react"

function Loader() {
  return (
    <div className="flex items-center justify-center flex-1">
      <svg className="w-8 h-8 text-red-500 fill-current animate-spin">
        <use xlinkHref="/img/sprite.svg#icon-loader" />
      </svg>
    </div>
  )
}

export default Loader
