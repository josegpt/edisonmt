import React from "react"
import classnames from "classnames"
import Icon from "./Icon"

function SocialNetwork() {
  const socialNetwork = [
    {
      url: "https://www.facebook.com/Edisonmt-122132589381197/",
      icon: "facebook",
      hoverColor: "text-blue-700",
    },
    {
      url: "https://twitter.com/EdisonMatos30",
      icon: "twitter",
      hoverColor: "text-blue-500",
    },
    {
      url: "https://www.youtube.com/c/EdisonMT",
      icon: "youtube",
      hoverColor: "text-red-500",
    },
  ]

  return (
    <div className="flex my-2">
      <span className="mr-2 font-semibold capitalize">siguenos</span>
      {socialNetwork.map((item, i) => (
        <a
          key={i}
          href={item.url}
          target="_blank"
          rel="external"
          className={classnames("mr-4", `hover:${item.hoverColor}`)}
        >
          <Icon name={item.icon} />
        </a>
      ))}
    </div>
  )
}

export default SocialNetwork
