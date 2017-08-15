# DB setup instructions

First create a database in Postgres:

```SQL
CREATE DATABASE example;
```

Then run this on the terminal:
```sh
psql example < setup_seed.sql
```

The `queries.sql` file contains example queries that work with the data you've just inserted on your database.
