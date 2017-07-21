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
// PassportJS
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy

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

// Passport auth configuration
// See: http://passportjs.org/docs/username-password
// On successful auth, passport will add a `user` object to request.
// Then we can simply check `req.user` on all routes!
passport.use(
  new LocalStrategy(
    {usernameField: 'email', passwordField: 'password'},
    (email, password, done) => {
      User.authenticate(email, password)
      .then((user) => done(null, user))
      .catch((error) => done(null, false, error))
    }
  )
)
// Now we teach passport how to store our user in the session (serializeUser)
// and how to make a user from the session (deserializeUser)
passport.serializeUser((user, done) => done(null, user.id))
passport.deserializeUser((id, done) => {
  User.find(id)
  .then((user) => done(null, user))
  .catch((error) => done(err, null))
})
// Use passport middleware
app.use(passport.initialize())
app.use(passport.session())


/*
 * ROUTES
 */

app.get('/', (req, res) => {
  console.log(req.flash)
  if (req.user) { // Created by passport
    res.render('app', {
      errors: req.flash('error'),
      info: req.flash('info'),
      user: req.user
    })
  }
  else {
    // If the user is not logged in, render the login/register page
    res.render('index', {
      errors: req.flash('error'),
      info: req.flash('info')
    })
  }
})


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


// Letting passport handle auth
app.post('/login', passport.authenticate('local', {
  successRedirect: '/',  // Our success and failure redirects
  failureRedirect: '/',  // are the same - see app.get('/')
  failureFlash: true
}))


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
