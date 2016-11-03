import React, {Component} from 'react';
import uuid from 'node-uuid';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';

const App = React.createClass({
  getInitialState: function() {
    return {
      data: {
        currentUser: {name: 'Anonymous'},
        messages: []
      }
    }
  },

  componentDidMount: function() {
    // Connect to the websocket as soon as <App/> is rendered
    this.socket = new WebSocket("ws://localhost:4000");
    // Remember this is client-side code! If you want more people to connect
    // to your chat, you need to point to a public IP!
    // this.socket = new WebSocket("ws://172.46.3.249:4000");

    // When the SERVER sends a message, we use receiveMessage to update the
    // component state and display it.
    this.socket.onmessage = this.receiveMessage;
  },

  sendMessage: function(new_message) {
    // This gets called when enter is pressed on <ChatBar/>.
    // We take the message object, stringify it and send it to the server.
    new_message.username = this.state.data.currentUser.name;
    this.socket.send(JSON.stringify(new_message));
  },

  receiveMessage: function(received_message) {
    // This gets called when we receive a broadcasted message from the server.
    // We parse the JSON and add it to the message window.
    var message = JSON.parse(received_message.data);

    // If message is a command, we process it. Else we display it.
    if (message.type === 'command') {
      this.processCommand(message.command, message.argument);
    }
    else {
      this.displayMessage(message);
    }
  },

  displayMessage: function(message) {
    // Right now we're doing the same for special and regular messages, but
    // we might change our minds in the future.
    // The `case` statement allows us to handle multiple cases with the same
    // block of code. It only stops when the `break` keyword is reached.
    // See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/switch
    switch (message.type) {
      case 'action':
      case 'system':
      case 'message':
        this.state.data.messages.push(message);
        this.setState({data: this.state.data});
      break;
    }
  },

  processCommand: function(command, argument) {
    let username = this.state.data.currentUser.name;

    switch (command) {
      case 'test':
        console.log("Testing! Argument:", argument);
      break;

      case 'slap':
        let who = argument || 'everyone';
        this.displayMessage({
          id: uuid.v4(),
          type: 'action',
          content: `${username} slaps ${who} around with a big trout!`
        });
      break;

      case 'me':
        if (!argument) {
          this.displayMessage({
            id: uuid.v4(),
            type: 'system',
            content: '/me needs an argument (e.g. "/me is eating a burrito").'
          });
        }
        else {
          this.displayMessage({
            id: uuid.v4(),
            type: 'action',
            content: `${username} ${argument}`
          });
        }
      break;
    }
  },

  setUser: function(new_user) {
    this.state.data.currentUser.name = new_user;
    this.setState({data: this.state.data});
  },

  render: function() {
    var data = this.state.data;
    return (
      <div>
        <MessageList
          messages={data.messages}
        />
        <ChatBar
          currentUser={data.currentUser.name}
          messageCallback={this.sendMessage}
          userCallback={this.setUser}
        />
      </div>
    );
  }
});
export default App;
