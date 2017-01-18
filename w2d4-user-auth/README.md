# Cookies, Sessions and User Authentication

## Cookies
Cookies are stored in the client. They are managed by the browser and are stored per domain.

## Creating Cookies
Cookies can be set by the server via an HTTP response. Cookies can also be set (and read) by Javascript running in the browser using `document.cookie`.

## Reading Cookies
Every time an HTTP Request is made, the browser **sends the cookies along with the request**. This makes it possible for the server to read the cookies, creating an illusion of data persistence.

## Sessions
Sessions use a cookie to store a unique session key on the user's computer. Using that unique key from the cookie, the server can identify a user. The session store stores information about the user on the server side.
