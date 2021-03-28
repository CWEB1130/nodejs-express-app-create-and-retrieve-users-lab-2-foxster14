var express = require('express');
var router = express.Router();
var fs = require('fs');

/* GET users listing. */
router.get('/', function(req, res, next) {
  ////res.send('respond with a resource');

  let boxerData = fs.readFileSync('./boxers.json');
  var siteBoxers = JSON.parse(boxerData);

  //Assigning the parsed array of objects read-in from boxers.json to a variable called createdBoxers
  var createdBoxers = siteBoxers; //why? 
  res.render('boxer', {createdBoxers});

});

module.exports = router;
