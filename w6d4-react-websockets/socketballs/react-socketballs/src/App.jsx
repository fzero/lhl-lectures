import React, { Component } from 'react'
import { debounce } from 'lodash'
import './App.css'

import InfoBar from './InfoBar'
import Ball from './Ball'

class App extends Component {
  constructor() {
    super()
    this.state = {
      id: '',
      myself: {
        id: '',
        name: '',
        color: '',
        x: 100,
        y: 100
      },
      clients: {}
    }

    // Throttles function call to at most once every 10ms to
    // prevent crashing the server.
    this.handleMovement = debounce(this.handleMovement, 10)
  }

  componentWillMount() {
    // Change here to allow other people to connect to your server
    // const host = '172.46.3.236'
    const host = 'localhost'
    this.socket = new WebSocket(`ws://${host}:5000`)
    this.socket.onmessage = this.handleMessage
  }

  refresh = () => {
    const message = {
      type: 'refresh',
      data: {
        id: this.state.id
      }
    }
    if (this.socket.readyState === this.socket.OPEN) {
      this.socket.send(JSON.stringify(message))
    }
  }

  handleMessage = ev => {
    const message = JSON.parse(ev.data)
    let newState = Object.assign({}, this.state)

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
        break

      // Adds a new client to the pool
      case 'connection':
        if (message.data.id !== this.state.id) {
          newState.clients[message.data.id] = message.data
        }
        this.setState(newState)
        break

      // Removes a client from the pool
      case 'disconnection':
        delete newState.clients[message.data.id]
        this.setState(newState)
        break

      // Processes an action (movement)
      case 'action':
        this.handleActionMessage(message.data)
        break

      // Catch-all
      default:
        console.log('Unsupported message:', message)
    }
  }

  handleActionMessage = data => {
    // No need to update yourself
    if (data.id === this.state.id) return

    // Catch race condition
    if (!this.state.clients[data.id]) {
      this.refresh()
      return
    }

    let newState = Object.assign({}, this.state)
    newState.clients[data.id].x = data.x
    newState.clients[data.id].y = data.y
    this.setState(newState)
  }

  handleMovement = newMyselfData => {
    this.setState({ myself: newMyselfData })
    const message = {
      type: 'action',
      data: newMyselfData
    }
    if (this.socket.readyState === this.socket.OPEN) {
      this.socket.send(JSON.stringify(message))
    }
  }

  render() {
    const { myself, clients } = this.state

    return (
      <div className="container">
        <InfoBar name={myself.name} />
        {Object.keys(clients).map(id => (
          <Ball
            key={id}
            client={clients[id]}
            isSelf={myself.id === id}
            movementCallback={this.handleMovement}
          />
        ))}
      </div>
    )
  }
}

export default App
