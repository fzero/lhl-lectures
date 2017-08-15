# LighthouseLabs W4D2 - SQL from Javascript

In this lecture we took our first steps to talk to a database (Postgres in this
case) from Node. We've used the [pg](https://www.npmjs.com/package/pg) package
to implement the simplest query interface available. In today's breakout you'll
learn about [knex](https://www.npmjs.com/package/knex), which makes it easier to
build SQL queries in JS.

The `pg` package can also use [ES6
promises](http://www.datchley.name/es6-promises/) to reduce callback hell when
talking to Postgres. This is a highly recommended pattern for everything
asynchronous! Compare [`app.js`](code/app.js) and [`musicdb.js`](code/musicdb.js) to
[`app-promises.js`](code/app-promises.js) and [`musicdb-promises.js`](code/musicdb-promises.js) to see the differences. Both
do pretty much the exact same thing.

## Keep it modular!

It's always a good idea to keep your data-handling code separated from your app's main logic. This way you don't need to think about writing SQL everytime you need to access the database - just let a function build the query for you.

As a practical example, which code would you rather maintain - this:
```js
db.query('SELECT * FROM users WHERE email = $1;', ['email@example.com'], (err, result) => {
  console.log(result)
})
```

or this?
```js
User.findByEmail('email@example.com', (err, result) => {
  console.log(result)
})
```

You can (and should!) add more functions to the `User` module as you go, which has the added benefit of allowing you to tweak the database access code separately from the rest of your app.

This pattern is so common that you can find multiple libraries that implement it in different languages. It is sometimes referred to as [Object-Relational Mapping (ORM)](https://en.wikipedia.org/wiki/Object-relational_mapping), where every class/module refers to a different table on the database. The most popular ORM for Node is [SequelizeJS](http://docs.sequelizejs.com/).

## Code

The final lecture code can be found in the [`code`](code/) folder. DB setup and
seed data can be found in the [`sql`](sql/) folder.
