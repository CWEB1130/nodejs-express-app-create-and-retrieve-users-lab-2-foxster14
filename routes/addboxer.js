var express = require('express');
var router = express.Router();
var fs = require('fs');
var boxer = require('../model/boxerstructure.js');

/* Create Boxer */
router.post('/', function(req, res, next) {

    //Using the data model boxer from boxerstructure.js
    boxer.name = req.body.name;
    boxer.boxingrecord = req.body.boxingrecord;
    boxer.division = req.body.division;
    boxer.password = req.body.residence; //WHY?? 
  
    //outputting boxer to console to verify that boxer was created
    console.log(boxer);
  
    //reading boxers from boxers.json file and assigning user to boxerData variable
    let boxerData = fs.readFileSync('./boxers.json');
  
    //The JSON.parse() is converting the string to JS objects
    let siteBoxers = JSON.parse(boxerData);
  
    //Adding the new boxer to the end of the converted array that was just read in from boxers.json
    siteBoxers.push(boxer);
  
    /**Now that the boxer has been added to the array, the JSON.stringify() method converts the JS array
    * into a string so that we can override the boxers.json file and write the updated array of objects to boxers.json file
    **/ 
    const boxersString = JSON.stringify(siteBoxers)
    fs.writeFile('./boxers.json', boxersString, err => {
        //error handling if, issue arises with file, else output to successfully wrote file
        if (err) {
            console.log('Error writing file', err)
        } else {
            console.log('Successfully wrote file')
        }
    })
  
    //Render the new boxer object to display view
    res.render('display', boxer)
  });

module.exports = router;