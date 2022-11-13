// start of CreateFileControl.js

const fsPromises = require('fs').promises;
const path = require('path')

const ActivityDB = {
    Activity: require ('../../Models/ActivityPlan.json'),
    setActivity: function(data){this.Activity = data}

}

// if info = false, this function will ask user to fill up the 
// mising info

const CreateFileControl = (req, res) => {

    if (!req.body.SemesterAndSchoolYear ||!req.body.WeekProgression||!req.body.ActivityNumber ||!req.body.CourseCode ||!req.body.CourseDescription ||
        !req.body.Module ||!req.body.Topic ||!req.body.Section ||!req.body.Schedule ||!req.body.Units ||!req.body.Professor) {
            return res.status(400).json({"message": 'Invalid! Please do not leave the fill up Information blank!'});

        }

    const NewActivity = {
        id: ActivityDB.Activity?.length ? ActivityDB.Activity[ActivityDB.Activity.length - 1].id + 1 : 1,
        "SemesterAndSchoolYear":req.body.SemesterAndSchoolYear,
        "WeekProgression": req.body.WeekProgression,
        "ActivityNumber":req.body.ActivityNumber,
        "CourseCode":req.body.CourseCode,
        "CourseDescription":req.body.CourseDescription,
        "Module":req.body.Module,
        "Topic":req.body.Topic,
        "Section":req.body.Section,
        "Schedule":req.body.Schedule,
        "Units":req.body.Units,
        "Professor":req.body.Professor,
}

    ActivityDB.setActivity([...ActivityDB.Activity,NewActivity]);
    res.json(ActivityDB.Activity);
    fsPromises.writeFile(path.join(__dirname,'..','..','Models','ActivityPlan.json'), JSON.stringify(ActivityDB.Activity));

}
    
module.exports = {CreateFileControl}


