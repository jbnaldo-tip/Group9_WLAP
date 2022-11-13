// start of ReadFileControl.js


const data = {};

// this function will let the admin to read all the activity stored
// in the database, if activity does not exist in data base
// it will prompt a message that it does not exist

data.Activity = require('../../Models/ActivityPlan.json');

const GetFileControl = async (req, res) => {    
    res.json(data.Activity);
}


module.exports = {GetFileControl}


// end ReadFIleControl.js

