# User authentication

Every app that does anything interesting will definitely need some form of user authentication. As we know, HTTP(S) is a **stateless** protocol, which means we need to use a few workarounds to create logged in/out states.

## Cookie-based sessions (with encryption)

This is by far the most common way to persist a logged-in state. The included example code (see [`/code`](code)) implements that. As a bonus, it also introduces a few concepts to better organize your code.

In a nutshell, an encrypted session cookie is created when a user is logged in. If the cookie isn't present, the user must login before proceeding. This means **you need to add a check to every endpoint that requires a login** and redirect the user to the login page whenever the session cookie isn't found *or* if it doesn't match any existing users.

This session cookie usually does NOT contain information that can identify the user directly. In most cases it's simply the user's id on the database.

## Token-based authentication

This is slightly more complex, but allows for more flexibility and gives users the option to login to your application using existing accounts on other services, such as GMail, Twitter, Facebook, Github and so on.

In essence, the user receives a token - usually a long string of random characters - once login is successful. From that point on, all requests to a given app will have to include the token to authenticate data access. This is very common when dealing with APIs.

The most common form of token-based authentication is [OAuth](https://oauth.net/). There are several different libraries that provide OAuth support ready to go for different services. The most popular for Javascript is [PassportJS](http://passportjs.org/).

PassportJS works as an [ExpressJS middleware](http://expressjs.com/en/guide/using-middleware.html), and also provides a convenient way to implement a [username/password-based workflow](http://passportjs.org/docs/username-password).

## Storing sensitive data safely

**You should never store unencrypted passwords anywhere, period.**

When in doubt, read the sentence above again.

You must be able to **verify** a password, but this doesn't mean making a straight comparison. The most common practice these days is to use a [cryptographic hash function](https://en.wikipedia.org/wiki/Cryptographic_hash_function) to generate a string of pseudo-random bytes based on a password. To authenticate a user, just use the same function again and compare the resulting hash.

Hashing functions can't be reversed (at least not easily). In other words, it's virtually impossible to retrieve a password from a good cryptographic hash. This means that even if a hacker gains access to your database, your customer's passwords are not in the open (but yes, it would still be a good idea to force them to reset it just in case).
