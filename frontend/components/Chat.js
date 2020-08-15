import React from "react"
import { Widget } from "react-chat-widget"

function Chat() {
  const handleNewUserMessage = (newMessage) => {
    console.log(`New message incoming! ${newMessage}`)
  }

  return <Widget handleNewUserMessage={handleNewUserMessage} />
}

export default Chat
