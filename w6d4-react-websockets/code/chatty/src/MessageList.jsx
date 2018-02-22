import React, {Component} from 'react';
import Message from './Message.jsx';

const MessageList = React.createClass({
  render: function() {
    var messages = this.props.messages;
    return (
      <div id="message-list">
        {messages.map(function(message){
          return <Message key={message.id} message={message} />
        })}
      </div>
    );
  }
});

export default MessageList;
