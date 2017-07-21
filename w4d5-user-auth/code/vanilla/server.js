require('dotenv').config();

const PORT = process.env.PORT || 8080;
const ENV = process.env.ENV || 'development';

const express = require('express');
const bodyParser = require('body-parser');
const sass = require('node-sass-middleware');
const cookieSession = require('cookie-session');
const flash = require('connect-flash');
const knexConfig = require('./knexfile');
const knex = require('knex')(knexConfig[ENV]);

// Separate file with user-related database logic
const User = require('./lib/user')(knex);

const app = express();

app.set('view engine', 'ejs');

// Because some dependencies are in devDependencies, they must not
// be required when the app is running in production environment
if (ENV === 'development') {
  const morgan = require('morgan');
  app.use(morgan('dev'));
  const knexLogger = require('knex-logger');
  app.use(knexLogger(knex));
}

app.use(cookieSession({
  name: 'session',
  keys: [process.env.SESSION_SECRET || 'development']
}));

app.use(flash());

app.use(bodyParser.urlencoded({extended: true}));

app.use('/styles', sass({
  src: __dirname + '/styles',
  dest: __dirname + '/public/styles',
  debug: true,
  outputStyle: 'expanded'
}));

app.use(express.static('public'));


app.get('/', (req, res) => {
  if (req.session.user_id) {
    // If the user is logged in, render the app
    User.find(req.session.user_id) // Get user info from DB
    .then((user) => {
      res.render('app', {
        errors: req.flash('errors'),
        info: req.flash('info'),
        user: user
      })
    })
    .catch(() => {
      res.render('index', {
        errors: req.flash('errors'),
        info: req.flash('info')
      });
    })
  } else {
    // If the user is not logged in, render the login/register page
    res.render('index', {
      errors: req.flash('errors'),
      info: req.flash('info')
    });
  }
});


// Update profile
app.post('/profile', (req, res) => {
  // We'll update what we need to. More details in lib/user.js
  User.update(req.session.user_id, req.body.email, req.body.password)
  .then(() => {
    // Indicate to the user that the update was successful
    req.flash('info', 'updated your profile');
    res.redirect('/');
  }).catch((err) => {
    // In the even that an error occurred at any point during the promise
    // chain, add the error message to the flash errors and redirect.
    req.flash('errors', err.message);
    res.redirect('/');
  });
});


app.get('/logout', (req, res) => {
  req.session = undefined;
  res.redirect('/');
});


app.post('/login', (req, res) => {
  User.authenticate(req.body.email, req.body.password)
  .then((user) => {
    // If email and password match, we assign the id to the session
    req.session.user_id = user.id;
    res.redirect('/');
  }).catch((err) => {
    // In the even that an error occurred at any point during the promise
    // chain, add the error message to the flash errors and redirect.
    req.flash('errors', err.message);
    res.redirect('/');
  });
});


app.post('/register', (req, res) => {
  if (!req.body.email || !req.body.password) {
    // If the registration form was submitted without a value for email or
    // password, then set an error message and redirect.
    req.flash('errors', 'email and password are required');
    res.redirect('/');
    // IMPORTANT: always return after sending a response, whether it's a
    // redirect, render, send, end, json, or whatever.
    return;
  }
  User.add(req.body.email, req.body.password)
  .then(() => {
    // This callback will be called after the promise returned by the last
    // call to .then has resolved. That happens after the user is inserted
    // into the database.
    req.flash('info', 'account successfully created');
    res.redirect('/');
  }).catch((err) => {
    // In the even that an error occurred at any point during the promise
    // chain, add the error message to the flash errors and redirect.
    req.flash('errors', err.message);
    res.redirect('/');
  });
});

app.listen(PORT, () => {
  console.log('Example app listening on port ' + PORT);
});
