# React & Websockets

* We're working on a simple implementation of the Chatty app
* We'll take the simple websockets approach we have and we'll extend it with different types of messages
  * Notification messages
    * "User has changed name"
  * Command messages, like in Slack or IRC (`/slap`, `/me` etc.)

The complete server app is inside [`/code/chatty-server`](code/chatty-server). It deals almost exclusively with websockets communication - no client code here. It will run on port 4000.

The client app is in [`/code/chatty`](code/chatty) and it will run on port 3000.

To run both apps just do the usual `npm install && npm start` dance.
