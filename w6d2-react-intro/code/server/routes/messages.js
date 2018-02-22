const router = require('express').Router();

const User = require('../models/user');
const Message = require('../models/message');

router.get('/', (request, response) => {
  Message.all().then(messages => {
    response.json(messages);
  });
});

router.post('/', (request, response) => {
  User.find(request.cookies.user).then(user => {
    return Message.create(user, request.body.content);
  }).then(message => {
    response.json({});
  })
});

router.get('/:id', (request, response) => {
  Message.find(request.params.id).then(message => {
    response.json(message);
  });
});

router.put('/:id/like', (request, response) => {
  Message.find(request.params.id).then(message => {
    return message.like(request.cookies.user);
  }).then(() => {
    response.json({});
  });
});

router.put('/:id/unlike', (request, response) => {
  Message.find(request.params.id).then(message => {
    return message.unlike(request.cookies.user);
  }).then(() => {
    response.json({});
  });
});

module.exports = router;
