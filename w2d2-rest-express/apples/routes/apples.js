var express = require('express');
var router = express.Router();

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
    res.status = 404;
    res.json({
      error: `Apple id=${req.params.id} not found`
    });
  }
})

router.post('/', function(req, res) {
  res.json({
    postParams: req.body
  });
});

module.exports = router;
