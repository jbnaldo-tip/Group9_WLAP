// Start of DeleteFileControl.js

const {default: mongoose} = require('mongoose');
const Activity = require('../../Models/ActivityPlan.js');
const path = require('path');
const { ObjectId }= require('mongodb');

// create the variable admin DB, the usual stuffs
// This function will check for the
// specfic activity in the database,
// that'll be deleted.

const HandleDeleteFileControl = async (req, res) => {
  let ActivityID = req.body.ActivityID


  let deletedActivity = {
    CourseCode: req.body.CourseCode,
    CourseDescription: req.body.CourseDescription,
  }

  Activity.findByIdAndDelete(ActivityID,{$set: deletedActivity})
  .then(() =>{
    res.json({
        message: "This activity is deleted successfully"
    })
  }) .catch(error => {
      res.json({
        message: "An error occured within the database"
      })
  })
  

  };


module.exports = {HandleDeleteFileControl}

// end of DeleteFileControl.js