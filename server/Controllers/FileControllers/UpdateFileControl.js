// start of UpdateFileControl.js


const Activity = require('../../Models/ActivityPlan.js')
const { filter } = require('lodash')
const path = require('path')
const {default: mongoose} = require('mongoose');


// create a function variable where you can update the file of the activity
const UpdateFileControl = async (req, res, next) => {
    let ActivityID = req.body.ActivityID

    let updatedActivity = {
        "SemesterAndSchoolYear": req.body.SemesterAndSchoolYear,
        "WeekProgression": req.body.WeekProgression,
        "ActivityNumber": req.body.ActivityNumber,
        "CourseCode": req.body.CourseCode,
        "CourseDescription": req.body.CourseDescription,
        "Module": req.body.Module,
        "Topic": req.body.Topic,
        "Section": req.body.Section,
        "Schedule": req.body.Schedule,
        "Units": req.body.Units,
        "Professor": req.body.Professor,
        "WeekProgression": req.body.WeekProgression

    }

    Activity.findByIdAndUpdate(ActivityID, {$set: updatedActivity})
    .then(() => {
        res.json({
            message: 'This activity is updated successfully'
        })
    }) .catch(error => {
        res.json({
            message: 'An error occurred within the database'
        })
    })
   
};

module.exports = {UpdateFileControl}

  // end of UpdateFileControl.js