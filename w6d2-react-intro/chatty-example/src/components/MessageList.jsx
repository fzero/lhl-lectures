import React from 'react';
import Message from './Message'
import SystemMessage from './SystemMessage'

const renderMessage = (message) => {
  if (message.type === 'system') {
    return (
      <SystemMessage
        username={message.username}
        content={message.content}
      />
    )
  }
  else {
    return (
      <Message
        username={message.username}
        content={message.content}
      />
    )
  }
}

const MessageList = (props) => (
  <main className="messages">
    {props.messages.map((message) => renderMessage(message))}
  </main>
)

export default MessageList
