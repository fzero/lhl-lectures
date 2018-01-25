# Cookies, Sessions and User Authentication

As we've seen before, HTTP is a **stateless** protocol, which means once a request is done, the conversation with the server is over. The server simply **does not** remember who you are on subsequent requests.

This is fine for simple pages, images and so on, but whenever the need for **keeping state information** arises (e.g. logged in vs. logged out), we need some sort of workaround to make it happen.

That's where cookies come in!

## Cookies
Cookies are stored in the client and sent back to the server with every request in a special header. They are managed by the browser and are stored per domain.

## Creating Cookies
Cookies can be set by the server via an HTTP response, but can also be set (and read) by Javascript running in the browser using `document.cookie`. [MDN has a detailed guide on this](https://developer.mozilla.org/en-US/docs/Web/API/Document/cookie) (as always!).

## Reading Cookies
Every time an HTTP Request is made, the browser **sends the cookies along with the request**. This makes it possible for the server to read the cookies, creating an illusion of data persistence.

## What about sessions?

The term _session_ is a catch-all for any mechanisms that keep track of user state in a web application. There are several ways to do it, but the most common one involves storing some information that identifies a given user in an encrypted cookie (usually a unique key or id).

Using that unique key from the cookie, the server can identify a user. The _actual_ user information should stay on the server side - you should **never** store sensitive information like emails, passwords or a user's name and address in a cookie!

### The `express-session` package

Take a look at [`/code-sessions`](code-sessions) to see a version of the code discussed in class using `express-session`. Note that **there isn't such a thing as `res.session`**, as all session information is actually stored on the **server**, and the encrypted cookie stored in the browser is just a _reference_ to that data.

In this current arrangement, all session data is gone once the server is shut down. But! The `express-session` package has a whole set of functions designed to save and retrieve functions to a file or database for further use. [Be sure to read the docs.](https://github.com/expressjs/session) 😉

## User Registration and Login
For part 2 of the lecture we looked at implementing the user registration and login flow.

### Login Steps:
1. Get the username and password from the login form
2. Look up the user by username
3. Check if the user's password matches the password that was entered in the login form
4. Set the session.username if the password matches

### Registration Steps:
1. Get the username and password from the registration form
2. Create a new user in the data store
3. Either redirect the user to the login page **or** login new user automatically

## Middleware

You can use a [custom Express middleware](http://expressjs.com/en/guide/writing-middleware.html) to check for logins in your app. This greatly reduces code repetition and it's considered a good practice. Check the example inside the [`/code`](code) folder for a practical example.

In a nutshell, Express middlewares are functions that take three arguments: `request`, `response` and `next`.

The first two are exactly what they seem to be, and you can add/remove stuff to `request` and `response` as much as you like (they're just plain JS objects). This is how `bodyParser` and `cookieParser` add form and cookie data to `request`.

The `next` argument is a callback that makes Express move on to the next middleware or process your routes.

```js
const myMiddleware = function(req, res, next) {
  // Here I can add stuff to req or res...
  req.message = "I've been middleware'd!"
  // ...display messages on the console
  console.log('--- Just passed through myMiddleware!')
  // ...and when I'm done I call next(). If I want to stop the process right
  // here (to redirect, for example), I simply DON'T call next().
  next()
}

// And here we insert our middleware into Express. Order matters!
app.use(myMiddleware)
```

## Code

There are a few different versions of the code for you to check:

* [`/code-nobcrypt`](code-nobcrypt) contains a version using middlewares and simple value comparison to check logins (no password encryption)
* [`/code`](code) is the same as above, but using `bcrypt` to encrypt passwords (good practice!)
* [`/code-sessions`](code-sessions) uses the `express-session` package instead of `cookieParser`, which adds **actual** encryption to cookies, plus a few other cool things.
