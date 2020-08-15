import React from "react"

function Icon({ name }) {
  return (
    <svg className="w-6 h-6 fill-current">
      <use xlinkHref={`/img/sprite.svg#icon-${name}`} />
    </svg>
  )
}

export default Icon
