const config = require('../../knexfile')['development'];

module.exports = require('knex')(config);