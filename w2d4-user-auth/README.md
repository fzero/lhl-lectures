# Cookies, Sessions and User Authentication

As we've seen before, HTTP is a **stateless** protocol, which means once a request is done, the conversation with the server is over. The server simply **does not** remember who you are on subsequent requests.

This is fine for simple pages, images and so on, but whenever the need for **keeping state information** arises (e.g. logged in vs. logged out), we need some sort of workaround to make it happen.

That's where cookies come in!

## Cookies
Cookies are stored in the client and sent back to the server with every request in a special header. They are managed by the browser and are stored per domain.

## Creating Cookies
Cookies can be set by the server via an HTTP response, but can also be set (and read) by Javascript running in the browser using `document.cookie`.

## Reading Cookies
Every time an HTTP Request is made, the browser **sends the cookies along with the request**. This makes it possible for the server to read the cookies, creating an illusion of data persistence.

## What about sessions?

The term _session_ is a catch-all for any mechanisms that keep track of user state in a web application. There are several ways to do it, but the most common one involves storing some information that identifies a given user in an encrypted cookie (usually a unique key or id).

Using that unique key from the cookie, the server can identify a user. The _actual_ user information should stay on the server side - you should **never** store sensitive information like emails, passwords or a user's name and address in a cookie!

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
