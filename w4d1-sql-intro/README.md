# Intro to relational databases and SQL

Tables! Schemas! Relations! Primary keys! Foreign keys! Welcome to the world of relational databases and SQL.

* Quick review: why do we need databases?
* The main types of database
  * Key-value storage (Redis, Memcache)
  * Document (MongoDB, CouchDB, Cassandra)
  * Relational/SQL (SQLite, PostgreSQL, mySQL, Oracle)

* How data is organized in relational databases
  * Database: the structure of information and the data stored within that structure
    * Tables: represent collections of information
      * Rows: represents a single object in a particular collection/table
        * Columns (or fields)
  * Keys
    * Natural keys
      * Some column in a table that is naturally unique between each object
    * Primary keys
      * Provide a way to uniquely identify each row in a table.
      * By convention, we use an auto-incrementing counting number. This column is named identically (usually `id`) in every table for programming convenience.
    * Foreign keys
      * Describe the association between two tables.
      * The data in a foreign key column in the child table must be the same as the data in the primary key column of a row in the parent table.

* ERD - Entity Relationship Diagram
  * A well-established standard used to visualize database relationships (and more!).

## Creating the database and loading some data

We're using [SQLite](https://sqlite.org/) for our example database. To recreate the data discussed in class on your machine, follow the steps below:

1. Import schema and load initial data: `sqlite3 music.db < sql/setup_seed.sql`
2. Open the `sqlite3` REPL: `sqlite3 music.db`
3. Once inside you can use both sqlite REPL commands (they always start with a dot) and SQL statements:
```sql
-- List all tables
.tables

-- Check the schema of a given table
.schema "artists"

-- Configure the REPL: this will turn on columns and headers
.mode column
.headers on

-- Now let's list all artists. Remember: all SQL statements must end with ;
SELECT * from artists;
```

There are several example queries in the [`/sql/queries.sql`](sql/queries.sql) file. You can copy-paste them into the SQLite REPL to test them.

A SQL statement can be divided in multiple lines. The end of the statement is always marked by a semicolon (`;`).
