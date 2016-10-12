const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');

// Initialize express
const app = express();

// Use EJS for views
app.set("view engine", "ejs");

// As we discussed before, Express is a very barebones library.
// We can add different functionality using middlewares, which are functions
// that process requests before they're handed to your routing functions.
// See: http://expressjs.com/en/guide/using-middleware.html

// To work with forms and JSON data, we need to configure Express
// to use the bodyParser middleware to convert those types of data
// into JS objects inside our functions.
app.use(bodyParser.urlencoded({extended: false})); // forms
app.use(bodyParser.json()); // JSON

// I'm also adding a logging middleware so we can see what's going on
// with our server. More info: https://github.com/expressjs/morgan
app.use(morgan('dev'));


// Routing functions go here
app.get('/', (req, res) => {
  res.render('index');
});


// Start the server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});
