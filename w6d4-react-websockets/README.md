# React & Websockets

* We've worked on a simple implementation of the Chatty app
* We've taken the simple websockets approach we had and we've extended it with a different type of message
  * Command messages, like in Slack or IRC (`/slap`, `/me` etc.)

The complete server app is inside [`/code/chatty-server`](code/chatty-server). It deals almost exclusively with websockets communication - no client code here. It will run on port 8080.

The client app is in [`/code/chatty`](code/chatty) and it will run on port 3000.

To run both apps just do the usual `npm install && npm start` dance.
