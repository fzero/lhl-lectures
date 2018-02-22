import React, {Component} from 'react';

const MessageInput = React.createClass({
  getInitialState: function() {
    return {value: this.props.message};
  },

  handleChange: function(event) {
    this.setState({value: event.target.value});
  },

  handleKeyPress: function(event) {
    if (event.charCode === 13) {
      this.props.messageCallback({
        content: this.state.value
      });
      this.setState({value: ''});
    }
  },

  render: function() {
    return (
      <input
        id="new-message"
        type="text"
        placeholder="Type a message and hit ENTER"
        value={this.state.value}
        onChange={this.handleChange}
        onKeyPress={this.handleKeyPress}
      />
    )
  }
});

const UserInput = React.createClass({
  getInitialState: function() {
    return {value: this.props.currentUser};
  },

  handleChange: function(event) {
    this.setState({value: event.target.value});
    this.props.userCallback(this.state.value);
  },

  render: function() {
    return (
      <input
        id="username"
        type="text"
        placeholder="Your Name (Optional)"
        value={this.state.value}
        onChange={this.handleChange}
        onBlur={this.handleChange}
      />
    )
  }
});


const ChatBar = React.createClass({
  render: function() {
    return (
      <footer>
        <UserInput
          currentUser={this.props.currentUser}
          userCallback={this.props.userCallback}
        />
        <MessageInput
          messageCallback={this.props.messageCallback}
        />
      </footer>
    );
  }
});
export default ChatBar;
