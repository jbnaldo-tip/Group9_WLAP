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
const DeleteFileControl = async(res, req) => {

    const {id} = req.body
    console.log(id);

    if(!id) return res.status(400).json({"message":`Empty input credential is not accepted`});

    const foundActivity = ActivityDB.Activity.find((u) => u.id == id);

    if(!foundActivity){
        return res.status(400).json({"message":`This activity does not exist in the database`});
    }
   
    const filterActivity = ActivityDB.Activity.filter((x) => x.id !== foundActivity.id);

    ActivityDB.setActivity(filterActivity);

    try {

        await fsPromises.writeFile(path.join(__diranme, '..','..','Models','ActivityPlan.json'), JSON.stringify(ActivityDB.Activity));
        res.json({message: `This Activity ${id}is now deleted`});
    } catch(err){
        console.error(err)
        res.sendStatus(500);
        
    }
    
}

module.exports = {DeleteFileControl}

// end of DeleteFileControl.js
