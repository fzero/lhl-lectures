const express = require('express')
const errors = require('../lib/errors')
const router = express.Router()

/////////
// Support functions
/////////

// Clean up JSON inputs so we only have the data we want
// Never trust the internet
const sanitizeProduct = (body) => {
  return {
    name: body.name,
    price: Number(body.price).toFixed(2),
    quantity: Number(body.quantity)
  }
}


/////////
// Routes
/////////

/*
API routes loosely follow the JSON API spec:
http://jsonapi.org

Successful requests should always include a "data" key.
If something goes wrong, an "errors" array of objects must be provided.
At the very least, each error must have a `message` key (Sequelize errors
already look like this, so we're good on validation errors!).
I've decided NOT to implement everything on the spec to keep this example as
lightweight as possible.

Additional status information is provided by HTTP status codes, as The Internet
Gods intended.
*/

// models is an object containing all loaded Sequelize models
// See models/index.js
module.exports = (models) => {

  // GET /products
  // Returns a JSON array containing all available product objects
  router.get('/', async (req, res) => {
    try {
      let result = await models.Product.findAll()
      res.json({data: result})
    }
    catch(error) {
      res.status(400).json(errors.normalize(error))
    }
  })


  // GET /products/:id
  // Returns a single product JSON object
  router.get('/:id', async (req, res) => {
    try {
      let result = await models.Product.findById(req.params.id)
      if (!result) {
        res.status(404).json(
          errors.normalize(`Product id=${req.params.id} not found`)
        )
        return
      }
      res.json({data: result})
    }
    catch(error) {
      res.status(400).json(errors.normalize(error))
    }
  })


  // POST /products
  // Inserts a new product from a JSON object
  // Returns the inserted product JSON object
  router.post('/', async (req, res) => {
    try {
      let result = await models.Product.create(sanitizeProduct(req.body))
      res.status(201).json({data: result.get({plain: true})})
    }
    catch(error) {
      res.status(400).json(errors.normalize(error))
    }
  })


  // PUT /products/:id
  // Updates a product from a JSON object
  // Returns the updated product JSON object
  router.put('/:id', async (req, res) => {
    let product = await models.Product.findById(req.params.id)
    if (!product) {
      res.status(404).json(
        errors.normalize(`Product id=${req.params.id} not found`)
      )
      return
    }

    try {
      let result = await product.update(sanitizeProduct(req.body))
      res.json({data: result.get({plain: true})})
    }
    catch(error) {
      res.status(400).json(errors.normalize(error))
    }
  })


  // DELETE /products/:id
  // Deletes a product by ID
  // Returns the deleted product JSON object
  router.delete('/:id', async (req, res) => {
    let product = await models.Product.findById(req.params.id)
    if (!product) {
      res.status(404).json(
        errors.normalize(`Product id=${req.params.id} not found`)
      )
      return
    }

    try {
      let result = await product.destroy()
      res.json({data: product})
    }
    catch(error) {
      res.status(400).json(errors.normalize(error))
    }
  })

  return router
}
