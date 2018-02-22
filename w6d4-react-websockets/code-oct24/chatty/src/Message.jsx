import React, {Component} from 'react';

const Message = React.createClass({
  render: function() {
    var message = this.props;
    var username = message.username || '';
    var messageClasses = ['content'];

    // We use the action type as a css class too.
    messageClasses.push(message.type);

    return (
      <div className="message" key={message.id}>
        <span className="username">{username}</span>
        <span className={messageClasses.join(' ')}>{message.content}</span>
      </div>
    );
  }
});

export default Message;
