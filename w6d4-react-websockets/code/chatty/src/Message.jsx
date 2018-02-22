import React, {Component} from 'react';

const Message = React.createClass({
  render: function() {
    let message = this.props.message;
    var username = message.username || 'Anonymous';

    let messageClasses = ['message'];
    if (message.type === 'command') {
      username = '';
      messageClasses.push('command');
    }

    return (
      <div className={messageClasses.join(' ')} key={message.id}>
        <span className="username">{username}</span>
        <span className="content">{message.content}</span>
      </div>
    );
  }
});

export default Message;
