import React, {Component} from 'react';
import Message from './Message.jsx';

const MessageList = React.createClass({
  render: function() {
    var messages = this.props.messages;
    return (
      <div id="message-list">
        {messages.map(function(message){
          return <Message key={message.id} username={message.username} content={message.content} />
        })}
      </div>
    );
  }
});

export default MessageList;
