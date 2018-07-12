# React & Websockets

We did a quick review of how websockets work before jumping into using them with React. The principles are the same - you just need to add code initialize the connection and make it available to your components (hint: `constructor()` and `componentDidMount()` are usually good places).

You can find the quick'n'dirty **Everybody talks!** app in [`/socket-server`](socket-server) _and_ [`/react-sockets`](react-sockets). Note that you need to run **both servers simultaneously**.

This app is extremely simple and treats all messages as strings.

## Socketballs

This is a slightly more complex app that allows multiple users to move circles on the screen at the same time, keeping everything in sync in real time. The main ideas are the same as in _Everybody talks!_, but:

1. All messages are actually `JSON` objects. This allows us to have different kind of messages for different purposes.
2. The server _keeps track of connected users_ and understands special messages designed to keep everything in sync.

While _Socketballs_ is very different from Chatty, the exact same ideas will apply. You'll need to create a few different message types and broadcast them to all connected clients. Each message type will have different effects in your UI, either changing user data or the way they're displayed (or both!).

The code can be found in [`/socketballs`](socketballs). Note that, once again, you'll have a [react app](socketballs/react-socketballs) and a [socket server app](socketballs/socket-server) that need to run simultaneously.