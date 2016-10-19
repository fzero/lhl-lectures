"use strict"
const express = require("express");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");

const app = express();
const PORT = process.env.PORT || 8080;

const Mongo       = require("mongodb")
const MongoClient = Mongo.MongoClient;
const MONGODB_URI = "mongodb://127.0.0.1:27017/todo_app";

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded());
app.use(methodOverride("_method"));

let dbInstance;

MongoClient.connect(MONGODB_URI, (err, db) => {
  if (err) {
    throw err;
  }
  console.log(`Successfully connected to DB: ${MONGODB_URI}`);
  dbInstance = db;
});

//////////////////////

// Just so home page doesn't 404 (annoying!)
app.get('/', (req, res) => {
  res.redirect('/todos');
});

// Fetch from Mongo all todos
app.get("/todos", (req, res) => {
  dbInstance.collection("todos").find().toArray((err, results) => {
    const templateVars = {
      todos: results
    };
    res.render("todos/index", templateVars);
  });
});

// Form to create new todo
app.get("/todos/new", (req, res) => {
  res.render("todos/new");
});

// Create new todo in Mongo
app.post("/todos", (req, res) => {
  const todo = { desc: req.body.desc, completed: false }; // mongo doc
  dbInstance.collection("todos").insertOne(todo, (err, result) => {
    res.redirect("/todos");
  });
});

// Delete by (mongo) ID
app.delete("/todos/:id", (req, res) => {
  const id = req.params.id;
  let filter = { _id: Mongo.ObjectId(id) };
  dbInstance.collection("todos").deleteOne(filter, (err, result) => {
    // We need to handle errors better
    if (err) { throw err; }
    res.redirect("/todos");
  });
});

/////////////////

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});

// The code below here is to make sure that we close the conncetion to mongo when this node process terminates

function gracefulShutdown() {
  console.log("Shutting down gracefully...");
  try {
    dbInstance.close();
  } catch (e) {
    throw e;
  } finally {
    console.log("Bye for now");
    process.exit();
  }
}
process.on ('SIGTERM', gracefulShutdown); // listen for TERM signal .e.g. kill
process.on ('SIGINT', gracefulShutdown);  // listen for INT signal e.g. Ctrl-C
