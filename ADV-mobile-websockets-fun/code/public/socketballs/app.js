// Poor person's jQuery
function $(query) {
  return document.querySelector(query);
}

function $$(query) {
  return document.querySelectorAll(query);
}

// Variables to store connected clients
var myself;
var clients = {};
var $container = $('#container');

// Main message handler
function handleMessage(ev) {
  var message = JSON.parse(ev.data);
  switch (message.type) {
    case 'setup':
      clients = message.data.connectedClients;
      myself = clients[message.data.id];
      $('#info').innerText = `You are ${myself.name}`;
      break;

    case 'connection':
      if (message.data.id !== myself.id) {
        clients[message.data.id] = message.data
      }
      break;

    case 'disconnection':
      delete clients[message.data.id];
      break;

    case 'action':
      handleAction(message.data);
      break;

    default:
      console.log('Unsupported message:', message);
  }
}


function handleAction(message) {
  console.log(message);
}


// Opens Websocket connection
var ws = new WebSocket("ws://localhost:5000");
// Use a publicly available IP to accept connections from other people!
// var ws = new WebSocket("ws://172.46.3.30:5000");

// The .onopen event is called right after a successful socket connection.
ws.onopen = function(ev) {
  console.log("Connected to server!");
}

// The .onmessage event is called everytime a message
// is received from the server
ws.onmessage = handleMessage;


window.setInterval(function() {
  var html = '';
  for (var id in clients) {
    var client = clients[id];
    var style = `background-color: ${client.color}; left: ${client.x}%; top: ${client.y}%;`;
    html += `<div class="ball" style="${style}"><span>${client.name}</span></div>`;
  }
  $container.innerHTML = html;
}, 10);
