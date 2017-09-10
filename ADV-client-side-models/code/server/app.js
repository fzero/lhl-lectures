// Bluebird promises are stil faster than native, so we load it at the top
// and immediately score a performance win, including async/await.
// Crazy, I know.
global.Promise = require('bluebird')

// Load configs from .env, if present
const dotenv = require('dotenv').config()

// Require everything else
const express = require('express')
const cors = require('cors')
const path = require('path')
const favicon = require('serve-favicon')
const logger = require('morgan')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const Sequelize = require('sequelize')

// Initialize Express
let app = express()

// Set environment
app.set('env', process.env['APP_ENV'] || 'development')

// Initialize database connection
// Note that we only log SQL activity in development mode
const dbURL = (app.settings.env === 'test') ? process.env.TEST_DB_URL : process.env.DB_URL
const dbLog = (app.settings.env === 'development') ? console.log : false
const sequelize = new Sequelize(dbURL, {logging: dbLog})

// Load Sequelize models. See models/index.js
const models = require('./models')(sequelize)

// Synchronize schemas on launch (development mode only)
if (app.settings.env === 'development') models.syncAll()

// Enabling CORS
// More info: https://github.com/expressjs/cors
let corsOptions = {}
if (app.settings.env === 'production') {
  // Configuration in production mode should be per domain!
  const corsWhitelist = ['http://example1.com', 'https://example2.com']
  corsOptions = {
    origin: (origin, callback) => {
      if (corsWhitelist.indexOf(origin) !== -1) callback(null, true)
      else callback(new Error('Not allowed by CORS'))
    }
  }
}
app.use(cors(corsOptions))
app.options('*', cors(corsOptions))

// View engine setup (HTML views)
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'hbs')

// HTTP Request logging (disabled in test mode)
if (app.settings.env !== 'test') {
  const loggerType = app.settings.env == 'production' ? 'common' : 'dev'
  app.use(logger(loggerType))
}

// Parser middleware: cookies, forms and JSON
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())

// Favicon: Uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))

// Serve static content from /public
app.use(express.static(path.join(__dirname, 'public')))

// Web routes
app.use('/', require('./web/index')(models))

// API routes
app.use('/products', require('./api/products')(models))
app.use('/clients', require('./api/clients')(models))

// catch 404 and forward to error handler
app.use((req, res, next) => {
  let err = new Error('Not Found')
  err.status = 404
  next(err)
})

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

console.log(`Running in ${app.settings.env} mode.`)

module.exports = app
