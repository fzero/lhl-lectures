# Websockets!

Today we played with WebSockets using a very minimalistic approach. We've started with something super bare-bones - just sending messages to the server and broadcasting them back to the client - and then we've built a (really fun and messy!) real-time chat application.

Websockets are a bidirectional protocol (vs. HTTP, which is request-response). This means messages can be sent both from server *and* client in real-time. This means the server **doesn't need to wait for a request to send a response**. This allows for real-time communication.

* Client-side
  * Just use the native [WebSocket API](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API/Writing_WebSocket_client_applications) (no need for socket.io these days)
* Server-side
  * Use the bare-bones `ws` package - https://github.com/websockets/ws
  * It's pretty close to the browser implementation of sockets

## Everybody talks!

The code discussed in class can be found inside [`/code`](code). The server-side code is in [`/code/server.js`](code/server.js) and the client-side is in [`/code/public/js/app.js`](code/public/js/app.js).
