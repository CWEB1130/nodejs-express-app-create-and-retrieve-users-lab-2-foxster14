var express = require('express');
var router = express.Router();
var fs = require('fs');
var boxer = require('../model/boxerstructure.js');

function jsonReader(filePath, cb) {
    fs.readFile(filePath, (err, fileData) => {
        if (err) {
            return cb && cb(err)
        }
        try {
            const object = JSON.parse(fileData)
            return cb && cb(null, object)
        } catch(err) {
            return cb && cb(err)
        }
    })
}


/* Create Boxer */
router.post('/', function(req, res, next) {

    //testing
    console.log(req.body.changing_attr);
    console.log(req.body.new_value);
    console.log(req.body.id_number);
    var updatedBoxer;


    var boxerRecords = jsonReader('./boxers.json', (err, originalboxer) => {
        if (err) {
            console.log('Error reading file:',err)
            return
        }
    
   

    //if (req.body.changing_attr == null){
        //console.log('Error, need to select from drop down')
    //}else {

   for(var x=0; x < originalboxer.length; x++){
        if (originalboxer[x].id == req.body.id_number){
                if (req.body.changing_attr == "name"){
                    originalboxer[x].name = req.body.new_value
                }
                if (req.body.changing_attr == "boxingrecord"){
                    originalboxer[x].boxingrecord = req.body.new_value
                }
                if (req.body.changing_attr == "division"){
                    originalboxer[x].division = req.body.new_value
                
                }if (req.body.changing_attr == "residence"){
                    originalboxer[x].residence = req.body.new_value
                }
                updatedBoxer = originalboxer[x];
                x = originalboxer.length;

              
        }
    }
    
  
    //outputting boxer to console to verify that boxer was created.
    console.log(updatedBoxer);
    //Render the new boxer object to display view
    res.render('updatecomplete', updatedBoxer);

    
    fs.writeFileSync('./boxers.json', JSON.stringify(originalboxer), (err) => {
            if (err) console.log('Error writing file:', err)
        })
    })

    //Render the new boxer object to display view
    //res.render('updatecomplete', {updatedBoxer})
  
    //reading boxers from boxers.json file and assigning user to boxerData variable
    //readFileSynx is a synchronous way to read a file, which is what we need in this case
    //since the info in our boxers.json file will change (b/c we are changing it)
    /*let boxerData = fs.readFileSync('./boxers.json');
  
    //The JSON.parse() is converting the string to a JSON object
    let siteBoxers = JSON.parse(boxerData);
  
    //Adding the new boxer to the end of the converted array that was just read in from boxers.json
    siteBoxers.push(boxer);
  
    /**Now that the boxer has been added to the array, the JSON.stringify() method converts the JS array
    * into a string so that we can override the boxers.json file and write the updated array of objects to boxers.json file
    **/ 
    /*const boxersString = JSON.stringify(siteBoxers)
    fs.writeFile('./boxers.json', boxersString, err => {
        //error handling if, issue arises with file, else output to successfully wrote file
        if (err) {
            console.log('Error writing file', err)
        } else {
            console.log('Successfully wrote file')
        }
    })*/
  
    //Render the new boxer object to display view
    //res.render('updatecomplete', updatedBoxer)
  });

module.exports = router;