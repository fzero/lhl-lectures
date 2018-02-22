import React, {Component} from 'react';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';

const App = React.createClass({
  getInitialState: function() {
    return {
      data: {
        currentUser: {name: undefined},
        messages: []
      }
    }
  },

  componentDidMount: function() {
    // Connect to the websocket as soon as <App/> is rendered
    this.socket = new WebSocket("ws://localhost:4000");
    // Remember this is client-side code! If you want more people to connect
    // to your chat, you need to point to a public IP!
    // this.socket = new WebSocket("ws://172.46.1.121:4000");

    // When the SERVER sends a message, we use addMessage to update the
    // component state and display it.
    this.socket.onmessage = this.addMessage;
  },

  sendMessage: function(new_message) {
    // This gets called when enter is pressed on <ChatBar/>.
    // We take the message object, stringify it and send it to the server.
    new_message.username = this.state.data.currentUser.name;
    this.socket.send(JSON.stringify(new_message));
  },

  addMessage: function(received_message) {
    // This gets called when we receive a broadcasted message from the server.
    // We parse the JSON and add it to the message window.
    var new_message = JSON.parse(received_message.data);
    this.state.data.messages.push(new_message);
    this.setState({data: this.state.data});
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
