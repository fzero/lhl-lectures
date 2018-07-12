import React, { Component, Fragment } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      contents: ''
    }
    this.socket = new WebSocket("ws://172.46.3.236:5000");
    this.socket.onmessage = this._handleMessage;
  }

  _handleMessage = (ev) => {
    this.setState({contents: ev.data})
  }

  _handleInput = (ev) => this.socket.send(ev.target.value)

  render() {
    const { contents } = this.state

    return (
      <Fragment>
        <h1>EVERYBODY TALKS</h1>

        <textarea
          name="typehere"
          id="typehere"
          className="typehere"
          onInput={this._handleInput}
          value={contents}
        />
      </Fragment>
    );
  }
}

export default App;
