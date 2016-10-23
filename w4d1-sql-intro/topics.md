# Intro to relational databases and SQL

Tables! Schemas! Relationships! Primary keys! Foreign keys! Welcome to the world of SQL.

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
