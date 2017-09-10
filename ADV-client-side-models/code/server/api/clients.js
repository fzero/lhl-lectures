const express = require('express')
const errors = require('../lib/errors')
const router = express.Router()

/////////
// Support functions
/////////

// Clean up JSON inputs so we only have the data we want
// Never trust the internet
const sanitizeClient = (body) => {
  return {
    firstName: body.firstName,
    lastName: body.lastName,
    email: body.email
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

  // GET /clients
  // Returns a JSON array containing all available client objects
  router.get('/', async (req, res) => {
    try {
      let result = await models.Client.findAll()
      res.json({data: result})
    }
    catch(error) {
      res.status(400).json(errors.normalize(error))
    }
  })


  // GET /clients/:id
  // Returns a single client JSON object
  router.get('/:id', async (req, res) => {
    try {
      let result = await models.Client.findById(req.params.id)
      if (!result) {
        res.status(404).json(
          errors.normalize(`Client id=${req.params.id} not found`)
        )
        return
      }
      res.json({data: result})
    }
    catch(error) {
      res.status(400).json(errors.normalize(error))
    }
  })


  // POST /clients
  // Inserts a new client from a JSON object
  // Returns the inserted client JSON object
  router.post('/', async (req, res) => {
    try {
      let result = await models.Client.create(sanitizeClient(req.body))
      res.status(201).json({data: result.get({plain: true})})
    }
    catch(error) {
      res.status(400).json(errors.normalize(error))
    }
  })


  // PUT /clients/:id
  // Updates a client from a JSON object
  // Returns the updated client JSON object
  router.put('/:id', async (req, res) => {
    let client = await models.Client.findById(req.params.id)
    if (!client) {
      res.status(404).json(
        errors.normalize(`Client id=${req.params.id} not found`)
      )
      return
    }

    try {
      let result = await client.update(sanitizeClient(req.body))
      res.json({data: result.get({plain: true})})
    }
    catch(error) {
      res.status(400).json(errors.normalize(error))
    }
  })


  // DELETE /clients/:id
  // Deletes a client by ID
  // Returns the deleted client JSON object
  router.delete('/:id', async (req, res) => {
    let client = await models.Client.findById(req.params.id)
    if (!client) {
      res.status(404).json(
        errors.normalize(`Client id=${req.params.id} not found`)
      )
      return
    }

    try {
      let result = await client.destroy()
      res.json({data: client})
    }
    catch(error) {
      res.status(400).json(errors.normalize(error))
    }
  })

  return router
}
