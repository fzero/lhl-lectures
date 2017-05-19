const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const sassMiddleware = require('node-sass-middleware')


// Initialize express
const app = express()

// Use EJS for views
app.set("view engine", "ejs")

// Body parsers
app.use(bodyParser.urlencoded({extended: false})) // forms
app.use(bodyParser.json()) // JSON

// SASS preprocessor
// NOTE: It should always be added before express.static
const appEnv = process.env.NODE_ENV || 'development'
if (appEnv === 'development') {
  app.use(sassMiddleware({
      src: './stylesheets',
      dest: './public/css',
      prefix:  '/css'
  }))
}

// Serve static content from /public
app.use(express.static('./public'))

// Logging
app.use(morgan('dev'))


// Routing goes here
app.get('/', (req, res) => {
  res.render('index')
})


// Start the server
const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`)
})
