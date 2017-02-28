// Poor person's jQuery
function $(query) {
  return document.querySelector(query);
}

// Variables to store connected clients
var myself, $myself;
var debouncer;
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
  render();
}


function handleAction(message) {
  clients[message.id].x = message.x;
  clients[message.id].y = message.y;
}


function render() {
  var html = '';
  for (var id in clients) {
    var client = clients[id];
    var style = `background-color: ${client.color}; left: ${client.x}%; top: ${client.y}%;`;
    var classes = "ball";
    if (id === myself.id) classes += " myself";
    html += `<div class="${classes}" id="${client.id}" style="${style}"><span>${client.name}</span></div>`;
  }
  $container.innerHTML = html;
  $myself = document.getElementById(myself.id);
  $myself.addEventListener("mousedown", handleMouseDown, false);
}


// Opens Websocket connection
var ip = "10.88.111.39";
var ws = new WebSocket(`ws://${ip}:5000`);
// Use a publicly available IP to accept connections from other people!
// var ws = new WebSocket("ws://172.46.3.30:5000");

ws.onopen = function(ev) {
  console.log("Connected to server!");
}

// The .onmessage event is called everytime a message
// is received from the server
ws.onmessage = handleMessage;


function normalizeToPercentage(x, y) {
  var pixelWidth = document.documentElement.clientWidth;
  var pixelHeight = document.documentElement.clientHeight;

  return {
    x: (100 * x) / pixelWidth,
    y: (100 * y) / pixelHeight
  }
}


function sendAction() {
  if (debouncer) {
    clearTimeout(debouncer);
  }
  debouncer = setTimeout(function() {
    var message = {
      type: 'action',
      data: myself
    }
    ws.send(JSON.stringify(message));
    debouncer = undefined;
  }, 2);
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
