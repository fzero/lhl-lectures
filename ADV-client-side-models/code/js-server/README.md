# Baaaes 💓

**Baaaes** is an opinionated, fully fleshed-out API server boilerplate based on [ExpressJS](http://expressjs.com) and [Sequelize](http://sequelizejs.com) with working examples and tests - you just have to jump in and modify it to your needs. It makes extensive use of `async`/`await` to eliminate callback hell _completely_ and make Javascript your bae.

## TL;DR HOWTO

1. Download the [zip package](https://github.com/fzero/baaaes/archive/master.zip) and unzip it somewhere (cloning is **not** recommended for normal use)
2. Run `npm install`
3. Copy `.env.example` to `.env` and add your Postgres DB configuration
4. If you need HTTPS support, run `npm run makecert`

You should be ready to go now! Start the server with `npm start` and run tests with `npm test`.


## How & why?

The basic code was created with [`express-generator`](https://expressjs.com/en/starter/generator.html), then the following changes were made:

* Complete conversion to native Node ES6 syntax.
* HTTPS support included, and you can generate self-signed certificates for development by running `npm run makecert`. Note that you **will** see warning messages; use [Let's encrypt](https://letsencrypt.org/) and a real domain name to avoid this.
* [CORS](https://en.wikipedia.org/wiki/Cross-origin_resource_sharing) support baked in with configuration examples.
* Differentiated environments (`development`, `test` and `production`) defined by the `APP_ENV` environment variable.
* [Handlebars](http://handlebarsjs.com/) templates for HTML views.
* [Sequelize](http://sequelizejs.com) as ORM, along with an example model implementation making extensive use of the `async`/`await` pattern to minimize frustration.
* Example API routes _with fully working RESTful CRUD endpoints_, also using `async`/`await`!
* [Mocha](http://mochajs.org/) integration tests for the example API. And guess what? We're using `async`/`await` for that too!


## Making Express great again with `async`/`await`

Let's face it, working with databases in Node has always been frustrating (to say the least). Node 7 introduces native support for `async`/`await`, which is nothing more than syntatic sugar on top of the Promise pattern. This means that **if your code uses promises, you can use `async`/`await` right now!**

So instead of writing an API route like this...

```js
// GET /products
// Returns a JSON array containing all available product objects
router.get('/', (req, res) => {
  models.Product.findAll()
  .then((result) => {
    res.json(result)
  })
  .catch((error) => {
    res.status(400).json(error)
  })
})
```

...you can write this instead!

```js
router.get('/', async (req, res) => {
  try {
    res.json(await models.Product.findAll())
  }
  catch(error) {
    res.status(400).json(error)
  }
})
```

Note how you can use `try`/`catch` for async error handling - and YES, IT WORKS! 💓


## External dependencies

**Baaaes** expects a Postgres database up and running, but you can modify the code to use any other database supported by Sequelize. You'll have to install the corresponding `npm` packages and modify the `.env` file. [Relevant documentation here.](http://docs.sequelizejs.com/en/v3/docs/getting-started/)

Out of the box, **Baaaes** uses URI-style configuration for database connections, but you can use as many environment variables as you want (e.g. `DB_USER`, `DB_PASS`, `DB_HOST` and so on). **Just make sure to keep you test database separated; all data is destroyed every time the test suite runs!**


## Note about boilerplates in general

The objective of Baaaes is **not** to prescribe how you should organize your project, but showing **one** particular way to do it (hence _opinionated_).

 If you already know what you're doing, you can configure Express, Sequelize, Knex, Mongo and whatever else you're using however you want. Still, it can be useful to take a peek at some of this code to inform your decisions.

This is one of the reasons I've decided against making Baaaes into a code generation package (such as `express-generator`). The other reason is it would be too much like creating yet another Javascript framework, and **NOBODY** wants that.

**NOBODY.**


## To do

* Authentication middleware example
* [JWT](https://jwt.io/) example
* Bake in Let's Encrypt
* Example NGINX configuration
* Clustering
* HTTP/2
* Koa version


## MIT License

Copyright (c) 2017 Fabio Neves

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
