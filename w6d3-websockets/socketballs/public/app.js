// Poor person's jQuery
function $(query) {
  return document.querySelector(query);
}

// Variables to store connected clients
var myself, $myself;
var clients = {};
var $container = $('#container');
var debouncer;

// Main message handler
function handleMessage(ev) {
  var message = JSON.parse(ev.data);

  switch (message.type) {

    // Receives list of all connected clients
    // and figures out who we are (so philosophical!)
    case 'setup':
      clients = message.data.connectedClients;
      myself = clients[message.data.id];
      $('#info').innerText = `You are ${myself.name}`;
      break;

    // Adds a new client to the pool
    case 'connection':
      if (message.data.id !== myself.id) {
        clients[message.data.id] = message.data
      }
      break;

    // Removes a client from the pool
    case 'disconnection':
      delete clients[message.data.id];
      break;

    // Processes an action (movement)
    case 'action':
      handleAction(message.data);
      break;

    // Catch-all
    default:
      console.log('Unsupported message:', message);
  }

  render();
}


// Since our actions ate just movements, read x and y coords
// And update corresponding client
function handleAction(message) {
  clients[message.id].x = message.x;
  clients[message.id].y = message.y;
}


// Renders all connected clients
// This is quick and dirty, but efficient
function render() {
  var html = '';

  for (var id in clients) {
    var client = clients[id];
    var style = `background-color: ${client.color}; left: ${client.x}%; top: ${client.y}%;`;
    var classes = "ball";
    if (id === myself.id) {
      classes += " myself";
    }
    html += `<div class="${classes}" id="${client.id}" style="${style}"><span>${client.name}</span></div>`;
  }

  // Actual render
  $container.innerHTML = html;

  // Add drag actions to $myself
  $myself = document.getElementById(myself.id);
  $myself.addEventListener("mousedown", handleMouseDown, false);
}


// Opens Websocket connection
// Use a publicly available IP to accept connections from other people!
// var ip = "172.46.3.233";
var ip = '127.0.0.1';
var ws = new WebSocket(`ws://${ip}:5000`);

ws.onopen = function(ev) {
  console.log("Connected to server!");
}

// The .onmessage event is called everytime a message
// is received from the server
ws.onmessage = handleMessage;


// Converts pixel positions to percentage to make
// everything resolution-independent
function normalizeToPercentage(x, y) {
  var pixelWidth = document.documentElement.clientWidth;
  var pixelHeight = document.documentElement.clientHeight;

  return {
    x: (100 * x) / pixelWidth,
    y: (100 * y) / pixelHeight
  }
}


// Sends movement events to the server via WebSockets
// Notice the use of setTimeout to limit the number of
// ws messages. This process is called debouncing.
function sendAction() {
  if (debouncer) {
    clearTimeout(debouncer);
  }
  debouncer = setTimeout(function() {
    var message = {
      type: 'action',
      data: myself
    }
    if (ws.readyState === ws.OPEN) {
      ws.send(JSON.stringify(message));
    }
    debouncer = undefined;
  }, 5);
}


// Drag events

function handleMouseDown() {
  document.addEventListener("mousemove", handleMouseMove, false);
  document.addEventListener("mouseup", handleMouseUp, false);
}

function handleMouseMove(ev) {
  var normPos = normalizeToPercentage(ev.pageX, ev.pageY);
  clients[myself.id].x = normPos.x;
  clients[myself.id].y = normPos.y;
  sendAction();
  render();
}

function handleMouseUp() {
  document.removeEventListener("mousemove", handleMouseMove, false);
  document.removeEventListener("mouseup", handleMouseUp, false);
}
