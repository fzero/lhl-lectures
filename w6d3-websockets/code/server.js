const express = require('express');
const SocketServer = require('ws').Server;

// Set the port to 5000
const PORT = 5000;

// Create a new express server
const app = express()
 // Make the express server serve static assets (html, javascript, css) from the /public folder
.use(express.static('public'))
.listen(
  PORT, '0.0.0.0', 'localhost',
  () => console.log(`Listening on ${PORT}`)
);

// Create the WebSockets server and attach it to express
const wss = new SocketServer({server: app});

// Stores the current value of the text box on the client
let currentContents = '';

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.on('connection', (client) => {
  console.log('Client connected');

  // Send current textbox contents on connection
  client.send(currentContents);

  // Handle messages
  client.on('message', handleMessage);

  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  client.on('close', () => console.log('Client disconnected'));
});


// Broadcast - Goes through each client and sends message data
wss.broadcast = function(data) {
  wss.clients.forEach(function(client) {
    client.send(data);
  });
};


// Handles incoming messages.
// Stores the current state of the textbox and broadcasts it
function handleMessage(message) {
  currentContents = message;
  wss.broadcast(message);
}


// Simply broadcasts the message back to all clients
function broadcastBack(message) {
  console.log(`Received: ${message}`)
  wss.broadcast(message);
}
