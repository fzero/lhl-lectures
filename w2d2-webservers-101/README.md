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
actions before they're handed over to your routes. **Note that most middlewares are individual npm packages**, so you must install them with `npm install --save` before using them.

Because of its barebones approach, there's an associated
[`express-generator`](http://expressjs.com/en/starter/generator.html) package
that helps creating an all-purpose app skeleton so you can hit the ground
running.

### A few popular middlewares that you'll definitely bump into

There's a [detailed list of middlewares](https://expressjs.com/en/resources/middleware.html) on the Express website, but here are a few choice ones:

* [serve-static](https://expressjs.com/en/resources/middleware/serve-static.html) - Used to serve static files through Express. Think CSS, images and client-side Javascript.
* [body-parser](https://expressjs.com/en/resources/middleware/body-parser.html) - Parses information posted from forms, cookies and via JSON, organizing the data into the `request` object.
* [morgan](https://expressjs.com/en/resources/middleware/morgan.html) - A logging middleware. It's always a good idea to use it!

## Code discussed in class

The [`/bare`](bare) folder contains the most bare-bones approach to creating an HTTP server in Node _without_ Express.

The code we've discussed in class can be found in the [`/code`](code) folder.
