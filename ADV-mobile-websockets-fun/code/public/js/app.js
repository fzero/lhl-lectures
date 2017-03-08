// Poor person's jQuery
function $(query) {
  return document.querySelector(query);
}

function $$(query) {
  return document.querySelectorAll(query);
}

// Opens Websocket connection
var ws = new WebSocket("ws://172.46.3.233:5000");
// Use a publicly available IP to accept connections from other people!
// var ws = new WebSocket("ws://172.46.3.30:5000");

// Send contents of textbox everytime someone types something
$('#typehere').addEventListener('input', function(ev) {
  // console.log("Some typing going on:", ev.target.value);
  ws.send(ev.target.value);
});

// The .onopen event is called right after a successful socket connection.
ws.onopen = function(ev) {
  console.log("Connected to server!");
}

// The .onmessage event is called everytime a message
// is received from the server
ws.onmessage = function(ev) {
  var message = ev.data;
  $('#typehere').value = message;
}
