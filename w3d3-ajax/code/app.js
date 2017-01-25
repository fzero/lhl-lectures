const express = require('express')
const path = require('path')
const logger = require('morgan')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')

// Init Express
const app = express()

// Middlewares
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))
app.use(logger('dev'))

// Here we're requiring our routes, which are regular Node
// modules in the /routes folder...
const apples = require('./routes/apples')

// ...and here we're mounting the routes on different prefixes.
// - /apples = /routes/apples.js
app.use('/apples', apples)

module.exports = app
