// start of UpdateFileControl.js

const fsPromises = require('fs').promises;
const { filter } = require('lodash');
const path = require('path')

const ActivityDB = {
    Activity: require ('../../Models/ActivityPlan.json'),
    setActivity: function(data){this.Lesson = data}

}


// create a function variable where you can update the file of the activity
const UpdateFileControl = async (req, res) => {

    const foundActivity = ActivityDB.Activity.find( Activity => Activity.id === parseInt(req.body.id));

    // if Admin not true 
    if(!foundActivity){

        // send error status and send message
        return res.status(400).json({"message":`Activity ID ${req.body.id} is not found`});

    }

    // this if statement will request input for data to be changed and updated, in this
    // case, the activity should be able to be edited.

    if(req.body.SemesterAndSchoolYear) foundActivity.SemesterAndSchoolYear = req.body.SemesterAndSchoolYear;
    if(req.body.WeekProgression) foundActivity.WeekProgression = req.body.WeekProgression;
    if(req.body.CourseCode) foundActivity.CourseCode = req.body.CourseCode;
    if(req.body.ActivityNumber) foundActivity.ActivityNumber = req.body.ActivityNumber;
    if(req.body.CourseDescription) foundActivity.CourseDescription = req.body.CourseDescription;
    if(req.body.Module) foundActivity.Module = req.body.Module;
    if(req.body.Topic) foundActivity.Topic = req.body.Topic;
    if(req.body.Section) foundActivity.Section = req.body.Section;
    if(req.body.Schedule) foundActivity.Schedule = req.body.Schedule;
    if(req.body.Units) foundActivity.Units = req.body.Units;
    if(req.body.Professor) foundActivity.Professor = req.body.Professor;

    // create a function to call out activity, activity dbase, and filter
    // to set integer

    const filterArray = ActivityDB.Activity.filter(Activity => Activity.id !== parseInt(req.body.id));
    const unsortArray = [...filterArray, foundActivity];

    ActivityDB.setActivity(unsortArray.sort((a, b) => a.id > b.id ?1 :a.id < b.id ? -1: 0));
    res.json(ActivityDB.Activity);
    fsPromises.writeFile(path.join(__dirname, '..','..','Models','ActivityPlan.json'), JSON.stringify(ActivityDB.Activity));

    
}

module.exports = {UpdateFileControl}

  // end of UpdateFileControl.js

