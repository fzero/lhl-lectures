import React, { Component } from 'react';

class ChatBar extends Component {
  onKeyPress = (ev) => {
    if (ev.key === "Enter") {
      this.props.handleMessage(ev.target.value)
      ev.target.value = ""
    }
  }

  render() {
    return (
      <footer class="chatbar">
        <input class="chatbar-username" placeholder="Your Name (Optional)" />
        <input
          class="chatbar-message"
          placeholder="Type a message and hit ENTER"
          onKeyPress={this.onKeyPress}
        />
      </footer>
    )
  }
}

export default ChatBar
