// start of CreateFileControl.js

const Activity = require('../../Models/ActivityPlan.js');
const path = require('path');
const {default: mongoose} = require('mongoose');
const { Module } = require('module');


// if info = false, this function will ask user to fill up the 
// mising info

const CreateFileControl = async (req, res) => {

    if (!req.body.SemesterAndSchoolYear ||!req.body.WeekProgression||!req.body.ActivityNumber ||!req.body.CourseCode ||!req.body.CourseDescription ||
        !req.body.Module ||!req.body.Topic ||!req.body.Section ||!req.body.Schedule ||!req.body.Units ||!req.body.Professor) {
            return res.status(400).json({"message": 'Invalid! Please do not leave the fill up Information blank!'});
        }
        

    try {


    await new Activity ({
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


    }).save();

        res.json({message:"The Activity has been created!"});
    }catch(err) {
        console.error(err)
        res.sendStatus(500);
    }

   
}


module.exports = {CreateFileControl}