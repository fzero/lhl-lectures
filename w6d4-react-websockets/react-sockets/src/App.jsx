import React, { Component, Fragment } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      contents: ''
    }

    // Add your public IP here if you want other people to connect
    // const socketServerURL = "ws://172.46.3.236:5000";
    const socketServerURL = "ws://localhost:5000";

    // Connects to websocket and attaches it to class
    this.socket = new WebSocket(socketServerURL);

    // Attaches message handling function to websocket
    this.socket.onmessage = this._handleMessage;
  }

  // Handles incoming message.
  // The contents are always in the 'data' property of the event.
  _handleMessage = (ev) => this.setState({contents: ev.data})

  // Handles text input
  _handleInput = (ev) => this.socket.send(ev.target.value)

  render() {
    const { contents } = this.state

    return (
      <Fragment>
        <h1>EVERYBODY TALKS!</h1>
        <textarea
          name="typehere"
          className="typehere"
          onInput={this._handleInput}
          value={contents}
        />
      </Fragment>
    );
  }
}

export default App;
