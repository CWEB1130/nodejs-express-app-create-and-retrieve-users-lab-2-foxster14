var express = require('express');
var router = express.Router();

//the statement below contains a render function - the first argument is the view name and the second argument is an object with one key/value pair.
res.render('createboxer', { title: 'Create Boxer'})

module.exports = router;