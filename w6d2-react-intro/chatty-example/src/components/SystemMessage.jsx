import React from 'react';

const SystemMessage = (props) => {
  const outputMessage = (
    props.username
    ? `${props.username} ${props.content}`
    : props.content
  )

  return (
    <div className="message system">
      {outputMessage}
    </div>
  )
}

export default SystemMessage
