const router = require('express').Router()
const appleDB = require('../models/appleDB')

// Remember: All routes in this file are prefixed with /apple
// See app.js for details

// Get all apples
router.get('/', (req, res) => {
  let response = appleDB.all()
  res.json(response);
})


// Get a specific apple
router.get('/:id', (req, res) => {
  let apple = appleDB.find(req.params.id)
  if (apple) {
    res.json(apple)
  }
  else {
    // Since we couldn't find what we were looking for,
    // we should stick to HTTP conventions and reply with
    // status 404 (not found).
    res.status(404).json({
      error: `Apple id=${req.params.id} not found`
    })
  }
})


// Adds a new apple
router.post('/', (req, res) => {
  if (!appleDB.isValid(req.body)) {
    res.status(400).json({
      error: `Bad request: your JSON must include type, color and taste.`
    })
    return
  }

  var createdApple = appleDB.create(req.body)

  res.json({
    status: 'ok',
    id: createdApple.id,
    data: createdApple
  })
})


// Updates an apple
router.put('/:id', (req, res) => {
  if (!req.params.id || !appleDB.isValid(req.body)) {
    res.status(400).json({
      error: `Bad request: no id included / your JSON must include type, color and taste.`
    })
    return
  }

  let appleId = Number(req.params.id)
  let updatedApple = appleDB.update(appleId, req.body)

  if (result) {
    res.json({
      status: 'ok',
      id: appleId,
      data: updatedApple
    })
  }
  else {
    res.status(404).json({
      error: `Apple id=${req.params.id} not found`
    })
  }
})


// Deletes an apple
router.delete('/:id', (req, res) => {
  if (!req.params.id) {
    res.status(400).json({
      error: `Bad request: no id included.`
    })
    return
  }

  let appleId = Number(req.params.id)
  let result = appleDB.del(appleId)

  if (result) {
    res.json({
      status: 'ok',
      id: appleId
    })
  }
  else {
    res.status(404).json({
      error: `Apple id=${req.params.id} not found`
    })
  }
})

module.exports = router
