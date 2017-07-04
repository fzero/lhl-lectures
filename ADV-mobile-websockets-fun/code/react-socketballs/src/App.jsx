import React, { Component } from 'react'
import './App.css'

import InfoBar from './InfoBar'
import Ball from './Ball'

class App extends Component {
  constructor() {
    super()
    this.state = {
      id: '1',
      myself: {
        id: '1',
        name: 'Test1',
        color: 'babaca',
        x: 100,
        y: 100
      },
      clients: {
        '1': {
          id: '1',
          name: 'Test1',
          color: 'babaca',
          x: 100,
          y: 100
        },
        '2': {
          id: '2',
          name: 'Test2',
          color: 'ff0000',
          x: 200,
          y: 200
        }
      }
    }

    this.handleMessage = this.handleMessage.bind(this);
    this.handleActionMessage = this.handleActionMessage.bind(this);
    this.handleMovement = this.handleMovement.bind(this);
  }

  componentDidMount() {
    const ip = '127.0.0.1'
    this.socket = new WebSocket(`ws://${ip}:5000`)

    // Websocket hooks
    // this.socket.onopen = (ev) => {
    //   if (this.socket.readyState === this.socket.OPEN) {
    //     this.socket.send(
    //       JSON.stringify({type: 'refresh', id: this.state.id})
    //     )
    //   }
    // }

    this.socket.onmessage = this.handleMessage
  }

  handleMessage(ev) {
    const message = JSON.parse(ev.data);
    let newState = this.state;

    switch (message.type) {

      // Receives list of all connected clients
      // and figures out who we are (so philosophical!)
      case 'setup':
        const clients = message.data.connectedClients
        const myself = clients[message.data.id]
        this.setState({
          clients: clients,
          myself: myself,
          id: myself.id
        })
        break;

        // Adds a new client to the pool
        case 'connection':
          if (message.data.id !== this.state.id) {
            newState.clients[message.data.id] = message.data
          }
          this.setState(newState)
          break;

        // Removes a client from the pool
        case 'disconnection':
          delete newState.clients[message.data.id];
          this.setState(newState)
          break;

        // Processes an action (movement)
        case 'action':
          this.handleActionMessage(message.data);
          break;

        // Catch-all
        default:
          console.log('Unsupported message:', message);
    }
  }

  handleActionMessage(data) {
    // No need to update yourself
    if (data.id === this.state.id) return;

    let newState = this.state;
    newState.clients[data.id].x = data.x
    newState.clients[data.id].y = data.y
    this.setState(newState)
  }

  handleMovement(newMyselfData) {
    this.setState({myself: newMyselfData})
    const message = {
      type: 'action',
      data: newMyselfData
    }
    if (this.socket.readyState === this.socket.OPEN) {
      this.socket.send(JSON.stringify(message));
    }
  }

  render() {
    return (
      <div className="container">
        <InfoBar name={this.state.myself.name} />
          {Object.keys(this.state.clients).map((id) =>
            <Ball
              key={id}
              client={this.state.clients[id]}
              isSelf={this.state.myself.id === id}
              movementCallback={this.handleMovement} />
          )}
      </div>
    )
  }
}

export default App;
