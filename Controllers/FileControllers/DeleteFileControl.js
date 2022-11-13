// start of DeleteFileControl.js

const fsPromises = require('fs').promises;
const path = require('path');


const ActivityDB = {
    Activity: require ('../../Models/ActivityPlan.json'),
    setActivity: function(data){this.Activity = data}

}

// create a function that will check for the 
// certain activity in the database,
// that'll be deleted, depending on admin's desire
const DeleteFileControl = async (res, req) => {

    const {ActivityNumber, CourseCode} = req.body

    if(!ActivityNumber || !CourseCode) return res.status(400).json({"message":`Empty input credential is not accepted`});

    const foundActivity = ActivityDB.Activity.find((u) => u.ActivityNumber ==  ActivityNumber);

    if (!foundActivity){
        return res.status(400).json({"message":`This activity does not exist in the database`});
    }
   
    const filterActivity = ActivityDB.Activity.filter((x) => x.ActivityNumber !== foundActivity.ActivityNumber);

    ActivityDB.setActivity(filterActivity);

    try {

        await fsPromises.writeFile(path.join(__diranme, '..','..','Models','ActivityPlan.json'), JSON.stringify(ActivityDB.Activity));
        res.json({message: `This Activity ${ActivityNumber}is now deleted`});
    } catch(err){
        console.error(err)
        res.sendStatus(500);
        
    }
    
}

module.exports = {DeleteFileControl}

// end of DeleteFileControl.js
