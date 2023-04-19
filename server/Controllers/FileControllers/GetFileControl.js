// start of ReadFileControl.js

// this function will let the admin to read all the activity stored
// in the database, if activity does not exist in data base
// it will prompt a message that it does not exist

const data = {};
const {default: mongoose} = require('mongoose');
const Activity = require('../../Models/ActivityPlan.js');

const GetFileControl = async (req, res, next) => {
    Activity.find()
    .then(response => {
        res.json({
            response
        })
    })
    .catch(error => {
        res.json({
            message:`An error occurred within the database`
        })
    })    
 
};


module.exports = {GetFileControl}


// end ReadFIleControl.js