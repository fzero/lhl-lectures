var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  // res.send("I'm just a string");
  var name = req.query.name;
  res.json({
    title: 'Awesomeness',
    moar: 'yaaaay',
    name: name,
    queryParams: req.query
  });
});

router.post('/', function(req, res, next) {
  res.json({
    queryParams: req.query,
    params: req.params,
    body: req.body
  });
});

module.exports = router;
