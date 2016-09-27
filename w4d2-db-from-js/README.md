# LighthouseLabs W4D2 - SQL from Javascript

In this lecture we took our first steps to talk to a database (Postgres in this
case) from Node. We've used the [pg](https://www.npmjs.com/package/pg) package
(and alternatively [pg-then](https://www.npmjs.com/package/pg-then)) to
implement the simplest query interface available. In today's breakout you'll
learn about [knex](https://www.npmjs.com/package/knex), which makes it easier to
build SQL queries in JS.

The `pg-then` package uses [ES6 promises](http://www.datchley.name/es6-promises/) to reduce callback hell when talking to Postgres. This is a highly recommended pattern for everything asynchronous! Check out [`musicdb.js`](code/musicdb.js) and [`musicdb-promises.js`](code/musicdb-promises.js) to see the differences. Both do the exact same thing.

The final lecture code can be found in the [`code`](code/) folder.
DB setup and seed data can be found in the [`sql`](sql/) folder.
