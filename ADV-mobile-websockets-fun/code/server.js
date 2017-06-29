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
wss.on('connection', (client) => {

  // Initialize a new client id
  const clientId = uuid()

  // Send initial client data
  clientConnected(client, clientId);

  // Handle messages
  client.on('message', handleMessage, client)

  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  client.on('close', () => {
    clientDisconected(clientId)
  })
})


// Broadcast - Goes through each client and sends message data
wss.broadcast = function(data) {
  wss.clients.forEach(function(client) {
    if (client.readyState === client.OPEN) {
      client.send(data)
    }
  })
}


// Simple function to return a random integer between 0 and max
function rand(max) {
  return Math.round(Math.random() * (max + 1))
}


// Connection event
function clientConnected(client, clientId) {

  // Create client data
  clients[clientId] = {
    id: clientId,
    name: faker.name.firstName(),
    color: randomColor().hexString(),
    x: rand(100),
    y: rand(100)
  }

  // Setup message to be set to the client
  // Includes all currently connected clients
  const setupMsg = {
    type: 'setup',
    data: {
      id: clientId,
      connectedClients: clients
    }
  }

  // Connection message to be sent to the client
  // Tells the client who they are
  const connectionMsg = {
    type: 'connection',
    data: clients[clientId]
  }

  if (client.readyState === client.OPEN) {
    client.send(JSON.stringify(setupMsg))
  }
  wss.broadcast(JSON.stringify(connectionMsg))
  console.log(`>> ${clients[clientId].name}`, clients[clientId])
}


// Disconnection event
function clientDisconected(clientId) {
  const client = clients[clientId]

  if (!client) return // catch race condition

  const disconnectionMsg = {
    type: 'disconnection',
    data: client
  }
  wss.broadcast(JSON.stringify(disconnectionMsg))
  console.log(`<< ${client.name} (${clientId}) disconnected`)
  delete clients[clientId]
}


// Handles incoming messages
function handleMessage(incoming, client) {
  // Broadcast message back no matter what
  wss.broadcast(incoming)

  var message = JSON.parse(incoming)

  switch(message.type) {
    case 'action':
      // Update client state based on id
      clients[message.data.id] = clients[message.data]
      break

    case 'refresh':
      const setupMsg = {
        type: 'setup',
        data: {
          id: message.data.id,
          connectedClients: clients
        }
      }
      if (client.readyState === client.OPEN) {
        client.send(JSON.stringify(setupMsg))
      }
      break


    default:
      console.log(`Unsupported message:`, message)
  }
}
