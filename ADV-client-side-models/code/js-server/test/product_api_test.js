const http = require('http')
const request = require('request-promise')
const Sequelize = require('sequelize')
const expect = require('chai').expect

// Require main app
const app = require('../app')

// Connect to test database and load models
const sequelize = new Sequelize(process.env.TEST_DB_URL, {logging: false})
const models = require('../models')(sequelize)

// Start server
const PORT = 8081
const BASEURL = `http://localhost:${PORT}`
const HTTPserver = http.createServer(app)
HTTPserver.listen(PORT)


//////////
// Product API tests
//////////

describe('Product API', function() {

  // Make sure all necessary tables are present
  before(async function() {
    await models.syncAll()
  })


  describe('With an empty products table', function() {

    // Empty products table before each test
    beforeEach(async function() {
      await models.Product.sync({force: true})
    })


    it('GET /products should return an empty result', async function() {
      const req = {
        method: 'GET',
        uri: `${BASEURL}/products`,
        resolveWithFullResponse: true,
        json: true
      }

      const response = await request(req)
      expect(response.statusCode).to.equal(200)
      expect(response.body).to.have.property('data').with.lengthOf(0)
    })


    it('GET /products/1 should return error 404', async function() {
      const req = {
        method: 'GET',
        uri: `${BASEURL}/products/1`,
        resolveWithFullResponse: true,
        simple: false,
        json: true
      }

      const response = await request(req)
      expect(response.statusCode).to.equal(404)
      expect(response.body).to.have.property('errors').with.lengthOf(1)
    })


    it('DELETE /products/1 should return error 404', async function() {
      const req = {
        method: 'DELETE',
        uri: `${BASEURL}/products/1`,
        resolveWithFullResponse: true,
        simple: false,
        json: true
      }

      const response = await request(req)
      expect(response.statusCode).to.equal(404)
      expect(response.body).to.have.property('errors').with.lengthOf(1)
    })


    it('POST /products with VALID product should create and return product', async function() {
      const newProduct = {
        name: "Test product",
        price: 10.10,
        quantity: 1
      }
      const req = {
        method: 'POST',
        uri: `${BASEURL}/products`,
        resolveWithFullResponse: true,
        simple: false,
        json: true,
        body: newProduct
      }

      const response = await request(req)
      expect(response.statusCode).to.equal(201)
      expect(response.body).to.have.property('data')
      expect(response.body.data).to.have.property('id')

      const added = await models.Product.findOne()
      expect(added.name).to.eql(newProduct.name)
      expect(added.price).to.eql(newProduct.price)
      expect(added.quantity).to.eql(newProduct.quantity)
    })


    it('POST /products with INVALID product should return error 400', async function() {
      const newProduct = {
        name: null,
        price: 10.10,
        quantity: 1
      }
      const req = {
        method: 'POST',
        uri: `${BASEURL}/products`,
        resolveWithFullResponse: true,
        simple: false,
        json: true,
        body: newProduct
      }

      const response = await request(req)
      expect(response.statusCode).to.equal(400)
      expect(response.body).to.have.property('errors').with.lengthOf(1)
    })
  })


  describe('With three existing products', function() {

    beforeEach(async function() {
      await models.Product.sync({force: true})
      const productData = [
        {id: 1, name: "Awesome product", price: 1.99, quantity: 100},
        {id: 2, name: "Stupendous product", price: 10.00, quantity: 10},
        {id: 3, name: "Insane product", price: 99.95, quantity: 5}
      ]
      await models.Product.bulkCreate(productData)
    })


    it('GET /products should return three products', async function() {
      const req = {
        method: 'GET',
        uri: `${BASEURL}/products`,
        resolveWithFullResponse: true,
        json: true
      }

      const response = await request(req)
      expect(response.statusCode).to.equal(200)
      expect(response.body).to.have.property('data').with.lengthOf(3)
    })


    it('GET /products/2 should return a single matching product', async function() {
      const req = {
        method: 'GET',
        uri: `${BASEURL}/products/2`,
        resolveWithFullResponse: true,
        json: true
      }

      const response = await request(req)
      expect(response.statusCode).to.equal(200)
      expect(response.body).to.have.property('data')
      expect(response.body.data.id).to.eql(2)
      expect(response.body.data.name).to.eql("Stupendous product")
      expect(response.body.data.price).to.eql(10.00)
      expect(response.body.data.quantity).to.eql(10)
    })


    it('DELETE /products/1 should remove and return product', async function() {
      const req = {
        method: 'DELETE',
        uri: `${BASEURL}/products/1`,
        resolveWithFullResponse: true,
        simple: false,
        json: true
      }

      const response = await request(req)
      expect(response.statusCode).to.equal(200)
      expect(response.body).to.have.property('data')
      expect(response.body.data.id).to.eql(1)
      expect(response.body.data.name).to.eql("Awesome product")
      expect(response.body.data.price).to.eql(1.99)
      expect(response.body.data.quantity).to.eql(100)

      const deleted = await models.Product.findById(1)
      expect(deleted).to.be.a('null')
    })


    it('PUT /products/2 with VALID data should update and return product', async function() {
      const newProduct = {
        name: "Amazeballs product",
        price: 15.95,
        quantity: 7
      }
      const req = {
        method: 'PUT',
        uri: `${BASEURL}/products/2`,
        resolveWithFullResponse: true,
        simple: false,
        json: true,
        body: newProduct
      }

      const response = await request(req)
      expect(response.statusCode).to.equal(200)
      expect(response.body).to.have.property('data')
      expect(response.body.data.id).to.eql(2)
      expect(response.body.data).to.have.property('name')
      expect(response.body.data).to.have.property('price')
      expect(response.body.data).to.have.property('quantity')

      const updated = await models.Product.findById(2)
      expect(updated.name).to.eql(newProduct.name)
      expect(updated.price).to.eql(newProduct.price)
      expect(updated.quantity).to.eql(newProduct.quantity)
    })


    it('PUT /products/2 with INVALID data should return error 400', async function() {
      const newProduct = {
        name: null,
        price: 15.95,
        quantity: 7
      }
      const req = {
        method: 'PUT',
        uri: `${BASEURL}/products/2`,
        resolveWithFullResponse: true,
        simple: false,
        json: true,
        body: newProduct
      }

      const response = await request(req)
      expect(response.statusCode).to.equal(400)
      expect(response.body).to.have.property('errors').with.lengthOf(1)
    })
  })

})
