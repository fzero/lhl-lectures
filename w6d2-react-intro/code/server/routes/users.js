const router = require('express').Router();

const User = require('../models/user');

router.get('/', (request, response) => {
  User.all().then(users => {
    response.json(users);
  });
});

router.get('/:id', (request, response) => {
  User.find(request.params.id).then(user => {
    response.json(user);
  });
});

module.exports = router;
