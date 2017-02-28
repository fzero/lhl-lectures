const express = require('express')
const SocketServer = require('ws').Server
const uuid = require('uuid/v4')
const randomColor = require('random-color')
const faker = require('faker')

// Set the port to 5000
const PORT = 5000

// Create a new express server
const app = express()
.use(express.static('public')) // add static to serve /public
.listen(
  PORT, '0.0.0.0', 'localhost',
  () => console.log(`Listening on ${PORT}`)
)

// Create the WebSockets server and attach it to express
const wss = new SocketServer({server: app})

// Currently connected clients
let clients = {}

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.on('connection', (ws) => {

  // Initialize a new client id
  const clientId = uuid()

  // Send initial client data
  clientConnected(ws, clientId);

  // Handle messages
  ws.on('message', handleMessage)

  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => {
    clientDisconected(clientId)
  })
})


// Broadcast - Goes through each client and sends message data
wss.broadcast = function(data) {
  wss.clients.forEach(function(client) {
    client.send(data)
  })
}


// Simple function to return a random integer between 0 and max
function rand(max) {
  return Math.round(Math.random() * (max + 1))
}


function clientConnected(ws, clientId) {
  clients[clientId] = {
    id: clientId,
    name: faker.name.firstName(),
    color: randomColor().hexString(),
    x: rand(100),
    y: rand(100)
  }

  const setupMsg = {
    type: 'setup',
    data: {
      id: clientId,
      connectedClients: clients
    }
  }

  const connectionMsg = {
    type: 'connection',
    data: clients[clientId]
  }

  ws.send(JSON.stringify(setupMsg))
  wss.broadcast(JSON.stringify(connectionMsg))
  console.log(`>> ${clients[clientId].name}`, clients[clientId])
}


function clientDisconected(clientId) {
  const disconnectionMsg = {
    type: 'disconnection',
    data: clients[clientId]
  }
  wss.broadcast(JSON.stringify(disconnectionMsg))
  console.log(`<< ${clients[clientId].name} (${clientId}) disconnected`)
  delete clients[clientId]
}


// Handles incoming messages.
function handleMessage(message) {
  wss.broadcast(message)
}
