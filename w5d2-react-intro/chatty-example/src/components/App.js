import React, { Component } from 'react';
import './App.css';

import Nav from './Nav';
import MessageList from './MessageList';
import ChatBar from './ChatBar';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: 'Anonymous',
      messages: []
    }
  }

  componentWillMount() {
    // Fetch data from the server
    // $.getJSON('/messages').then(...)
    // Put it in a variable, then...
    this.setState({
      messages: [
        {
          type: 'message',
          username: 'John Smith',
          content: "Sup brah"
        },
        {
          type: 'message',
          username: 'Mary Smythe',
          content: "I say, that's so rude of you, I'm not your brother!"
        },
        {
          type: 'message',
          username: 'John Smith',
          content: "LULZ BRB WTF BBQ"
        },
        {
          type: 'system',
          username: 'John Smith',
          content: "slapped other users with a big trout"
        }
      ]
    })
  }

  handleMessage = (content) => {
    const newMessage = {
      type: 'message',
      username: this.state.username,
      content: content
    }
    let messages = this.state.messages
    messages.push(newMessage)
    this.setState({messages: messages})
  }

  render() {
    return (
      <div>
        <Nav />
        <MessageList messages={this.state.messages} />
        <ChatBar handleMessage={this.handleMessage} />
      </div>
    )
  }
}

export default App;
