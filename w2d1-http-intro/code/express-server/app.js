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

// Used in the app.post('/login') route
var validUsers = {
  'e@mail.com': {password: '1234'},
  'fabio@mail.com': {password: '4567'}
}

// Routing functions go here
app.get('/', function(req, res) {
  res.render('index', {query: req.query});
});

app.get('/hello/:name', function(req, res) {
  res.send(`Hello ${req.params.name}!`);
});

app.get('/query', function(req, res) {
  console.log(req.query);
  var queryParams = "";
  for (var key in req.query) {
    queryParams += `${key}: ${req.query[key]}\n`
  }
  res.send(queryParams);
});

app.get('/login', function(req, res) {
  res.render('loginform');
});

app.post('/login', function(req, res){
  console.log(validUsers[req.body.email])
  if (validUsers[req.body.email] && validUsers[req.body.email].password === req.body.password) {
    res.render('loggedin', {email: req.body.email})
  }
  else {
    res.redirect('/login');
  }
});


// Start the server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});
