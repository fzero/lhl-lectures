# Client-side app structure: routing and models

## Client-side routing with `react-router`

We're all familiar with server-side routing like we do in Express with `app.get('/path', ...)` and so on. That kind of routing is very easy to reason about, since each request results in exactly one response and that's it.

Client-side routing in frameworks like React is a bit different, since the whole application usually only loads once (it's a **single-page** application after all).

Originally this meant two things:

1. The location (URL) bar in the browser _never_ changed
2. The back button was completely broken (e.g. pressing back exits the app)

To fix these problems you need something in your app to link URLs to components, and [`react-router`](https://reacttraining.com/react-router/web/guides/philosophy) is the most popular way to achieve this in React.

React-router is very effective, but it's also **nothing** like client-side routing. Techincally there's **no** centralized place to put your routes - you can sprinkle them all through your app! 😱

This results in a lot of flexibility, but it can also become quite confusing. Be sure to check the main [`<App>`](code/client/src/components/App.jsx) component on the [included code](code) and also [`<Products>`](code/client/src/components/Products.jsx) to see an example of a route embedded within a component. [`<ProductDetails>`](code/client/src/components/ProductDetails.jsx) has an example of the `<Redirect>` component in action.

The [project documentation](https://reacttraining.com/react-router/web/guides/quick-start) is very good and contains plenty of examples, but a quick summary doesn't hurt:

* You'll use `<Switch>` and `<Route>` to match URLs to components you want to render
* `<Link>` does pretty much the same as `<a href>`
* `<Redirect>` will send the user to the specified URL when rendered

## Client-side models

It's very common to see client-side apps written by beginners using `$.ajax()` or `fetch()` directly inside React components, but that isn't a particularly good practice. The best way to do that is to modularize your API access and create client-side models. For practical examples with plenty of comments, take a look at [`api.js`](code/client/src/models/api.js) and [`resource.js`](code/client/src/models/resource.js) in the `/client` folder of the [example code](code).

These modules allow you to interact with your API like this...

```js
ProductStore.findAll()
.then((result) => this.setState({products: result.data, errors: null}))
.catch((errors) => this.setState({errors: errors}))
```

...instead of spaghettifying your app like this:

```js
const options = {
  method: 'GET',
  headers: new Headers(),
  mode: 'cors',
  cache: 'default'
}
fetch('http://localhost:8080/products', options)
.then((response) => response.text())
.then((body) => JSON.parse(body))
.then((parsed) => this.setState({products: parsed.data.data, errors: null}))
.catch((errors) => this.setState({errors: errors}))
```

## About the code

To demonstrate the complete separation between client and server, we actually have **two** servers that can be used with the client-side app without any changes!

* [The first is coded in JS](code/js-server) and is based on an express boilerplate called [BAAAAES](https://github.com/fzero/baaaes). Start it with `npm start` as usual. **NOTE:** this server is currently configure to use Postgres, so read the code and configure it properly!
* [The second is a Rails server](code/rails-server) created with `rails new --api`. You should start it with `bin/rails s -p 8080` so the client application can find it. It uses sqlite3, so you should be ready to go no matter what. Don't forget to run `bundle install && bin/rake db:setup` before spinning the server.

Both servers implement the same routes and are configured with [CORS](https://en.wikipedia.org/wiki/Cross-origin_resource_sharing) support.
