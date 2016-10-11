var express = require('express');
var router = express.Router();

// Let's create an object to serve as our apple "database"
var appleDB = [
  {
    id: 1,
    type: "Granny Smith",
    color: "green"
  },
  {
    id: 2,
    type: "Royal Gala",
    color: "redish"
  },
  {
    id: 3,
    type: "Pink Lady",
    color: "pink"
  }
];


// Remember: All routes in this file are prefixed with /apple
// See app.js for details

router.get('/', function(req, res) {
  res.json(appleDB);
})


router.get('/:id', function(req, res) {
  var apple = appleDB.filter(function(apple){
    return (apple.id == req.params.id);
  })[0];

  if (apple) {
    res.json(apple);
  }
  else {
    // Since we couldn't find what we were looking for,
    // we should stick to HTTP conventions and reply with
    // status 404 (not found).
    res.status(404).json({
      error: `Apple id=${req.params.id} not found`
    });
  }
})


// This POST route just echoes back all data.
// Remember: in POST requests all data sent from the client will
// show up in the body, so you should check req.body instead of
// req.params or req.query
router.post('/', function(req, res) {
  res.json({
    postParams: req.body
  });
});


module.exports = router;
