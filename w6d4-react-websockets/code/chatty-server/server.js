const express = require('express');
const SocketServer = require('ws').Server;
var uuid = require('node-uuid');

// Set the port to 8080
const PORT = 8080;

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
  ws.on('message', handleMessage);

  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => console.log('Client disconnected'));
});

// Broadcast - Goes through each client and sends message data
wss.broadcast = function(data) {
  wss.clients.forEach(function(client) {
    client.send(data);
  });
};


function handleMessage(message_data) {
  // Receive message, parse, then add unique id so React behaves correctly
  console.log(`Received: ${message_data}`)
  let message = JSON.parse(message_data);
  message.id = uuid.v4();
  message.type = 'message';

  /*
    If the message starts with a '/'
    - Extract the command, i.e. what comes right after the '/'
      - Use this regex ^\/(\w+)\s
    - Send the message back to the client with a different type
      - Regular message: type = 'message'
      - Command message: type = 'command'
  */
  let match = message.content.match(/^\/(\w+)\s/);
  if (match) {
    let command = match[1];
    message.type = "command";
    message.command = command;
  }

  // Now we stringify the message and send it back to all clients via broadcast
  var to_send = JSON.stringify(message);
  wss.broadcast(to_send);
  console.log(`Sent: ${to_send}`);
}
