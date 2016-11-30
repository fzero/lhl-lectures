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

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.on('connection', (ws) => {
  console.log('Client connected');

  // Echo back messages (testing purposes)
  ws.on('message', broadcastBack);

  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => console.log('Client disconnected'));
});

// Broadcast - Goes through each client and sends message data
wss.broadcast = function(data) {
  wss.clients.forEach(function(client) {
    client.send(data);
  });
};


function broadcastBack(message) {
  console.log(`Received: ${message}`)
  wss.broadcast(message);
}
