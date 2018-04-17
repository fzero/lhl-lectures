var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  console.log("This will never be displayed on the browser!");
  var query = req.query;
  console.log("Query:", query);
  res.send("Hello from express!");
});

router.get('/bananas', function(req, res) {
  var fruit = "Banana";
  var howMany = 20;
  res.send("Number of bananas: " + howMany);
});

router.get('/form', function(req, res) {
  res.render('form');
});

router.post('/form', function(req, res) {
  var html = `
    <p>username: ${req.body.username}</p>
    <p>password: LOL nope! Just kidding: ${req.body.password}</p>
    <h1>LOL PWND!</h1>
  `;
  res.send(html);
});

module.exports = router;
