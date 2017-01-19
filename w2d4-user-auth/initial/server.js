const express = require('express')
const bodyParser = require('body-parser')
const bcrypt = require('bcrypt')
const cookieParser = require('cookie-parser')
const morgan = require('morgan')

// Initialize Express
const app = express()
const PORT = process.env.PORT || 8000 // default port 8000

// Uses EJS for views
app.set('view engine', 'ejs')

// parse application/x-www-form-urlencoded form data into req.body
app.use(bodyParser.urlencoded({ extended: false }))

// Set up cookie parser middleware.
// - Access cookies with req.cookies or req.signedCookies if the cookie was signed.
// - Set cookies with res.cookie('cookieName')
// cookieParser takes in the secret key as an argument. It uses this key to
// sign cookies.
app.use(cookieParser('my_super_secret_key'))

// Serve static files (css, images etc.) from /public
app.use(express.static('public'))

// I'm also adding a logging middleware so we can see what's going on
// with our server. More info: https://github.com/expressjs/morgan
app.use(morgan('dev'))

// Let's keep all of our data in one place
const data = {
  users: [
    {username: 'fabio', password: 'secret!'}
  ]
}


/*
 * HERE BE ROUTES!
 */

app.get('/cookies', (req, res) => {
  res.render('cookies', {cookies: req.cookies})
})

app.get('/', (req, res) => {
  // if user logged in show treasure,
  // else show login
  const current_user = req.current_user
  if(current_user) {
    res.redirect('/treasure')
  }
  else {
    res.render('login')
  }
});

app.get('/login', (req, res) => {
  res.render('login')
})

app.post('/login', (req, res) => {
  const username = req.body.username
  const password = req.body.password
  // Find user by username
  const user = data.users.find((user) => { return user.username === username })
  // check the password - naive way
  if (password === user.password) {
    res.cookie('current_user', user.username)
    res.redirect('/treasure')
  }
  else {
    res.redirect('/login')
  }
})

app.get('/signup', (req, res) => {
  res.render('signup')
})

app.post('/signup', (req, res) => {
  data.users.push({username: req.body.username, password: req.body.password})
  console.log('All users are: ', data.users)
  res.redirect('/')
})

app.get('/logout', (req, res) => {
  res.cookie('current_user', '')
  res.redirect('/login')
})

app.get('/treasure', (req, res) => {
  const current_user = req.cookies.current_user
  res.render('treasure', {current_user})
})


// Start Express
app.listen(PORT, () => {
  console.log(`Express listening on port ${PORT}!`)
})
