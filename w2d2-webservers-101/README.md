# Webservers 101

So far we've discussed how to connect to webservers using the HTTP protocol.
Today we'll make our own!

## Express.js

[Express.js](http://expressjs.com) is the most popular web server package for
Node. It's simple, fast and barebones, including only what's necessary to handle
http requests. The code we've built in class used a very simple configuration
that only does the basics.

To add more features to Express, we use
[middlewares](http://expressjs.com/en/guide/using-middleware.html), which are
functions that process HTTP requests as they arrive and can perform a variety of
actions before they're handed over to your routes.

Because of its barebones approach, there's an associated
[`express-generator`](http://expressjs.com/en/starter/generator.html) package
that helps creating an all-purpose app skeleton so you can hit the ground
running.
