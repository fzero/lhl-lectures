# Websockets!

Websockets are a bidirectional protocol (vs. HTTP, which is request-response). This means messages can be sent both from server *and* client in real-time. This means the server **doesn't need to wait for a request to send a response**. This allows for real-time communication.

Today we'll play with WebSockets using a very minimalistic approach to create an extremely messy chat app.

* Client-side
  * Just use the native [WebSocket API](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API/Writing_WebSocket_client_applications) (no need for socket.io these days)
* Server-side
  * Use the bare-bones `ws` package - https://github.com/websockets/ws
  * It's pretty close to the browser implementation of sockets
