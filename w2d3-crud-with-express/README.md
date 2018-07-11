# CRUD over HTTP with Express - forms and more

We've used a very minimal Express server (simpler than the one created with
`express-generator`!) to implement a simple application with a (mostly) complete
workflow, including pages and forms.

We went through the following topics:

* Implementing CRUD over HTTP with Express
  * Using what we've discussed about REST
* Render vs Redirect pattern in multi-page apps
* Forms (action, method)
* Links (`<a>` tags) compared to Forms
* Exploring the DevTools network tab in Chrome
* Explore the full lifecycle of GET -> Submit Form -> POST -> Redirect -> GET
* Query string params vs Post Data params (and how they are encoded)
* Express debugging tactics

## A pinch of MVC

The [Model-View-Controller
pattern](https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93controller) is
a very popular pattern to organize web applications. It advocates separating
data storage logic (**Model**) from display logic (**View**) using a layer in between to
handle user requests (**Controller**).

We've applied this pattern to our example application (see [`/code`](code)
folder) creating a simple model that handles all data storage functions.

## REST Cheatsheet

### CRUD to HTTP

| Action    | HTTP verb/method |
| --------- | ---------------- |
|**C**reate | POST             |
|**R**ead   | GET              |
|**U**dpate | PUT/PATCH        |
|**D**elete | DELETE           |

**NOTE:** Browsers only support `GET` and `POST` actions from pure HTTP forms. TO use `PUT`/`PATCH`/`DELETE` you'll either need to use client-side JS or the [`method-override`](http://expressjs.com/en/resources/middleware/method-override.html) middleware.

### BREAD - Additions to CRUD and how they map to URLs

Using the [Apples app](code) as an example:

| Action    | HTTP method & URL       | Details             |
| --------- | ----------------------- | ------------------- |
|**B**rowse | `GET /apples`           | Show all apples     |
|**R**ead   | `GET /apples/:id`       | Show a single apple |
|**E**dit   | `GET /apples/:id/edit`  | Show populated form |
|           | `PUT/PATCH /apples/:id` | Submit updated data |
|**A**dd    | `GET /apples/new`       | Show empty form     |
|           | `POST /apples`          | Submit new data     |
|**D**elete | `DELETE /apples/:id`    | Self-explanatory    |

## Bonus: `nodemon`

The [`nodemon`](https://nodemon.io/) package automatically reloads your express server when the code is modified. To use it, you need to install it as a dev dependency and run it when you call `npm start`.

```
# in your project folder
npm install --save-dev nodemon
```

On your `package.json`:
```json
// ...
"scripts": {
  "start": "npx nodemon node app.js"
},
// ...
```