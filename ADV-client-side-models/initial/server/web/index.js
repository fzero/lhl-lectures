const express = require('express')
const router = express.Router()

// models is an object containing all loaded Sequelize models
// See models/index.js
module.exports = (models) => {

  // GET /
  router.get('/', (req, res) => {
    res.render('index', { title: 'Baaaes 💓' })
  })

  return router
}
