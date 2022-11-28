// Start of DeleteFileControl.js

const fsPromises = require('fs').promises;
const path = require('path');
const { u } = require('tar');

// create the variable admin DB, the usual stuffs

const ActivityDB = {

    Activity: require('../../Models/ActivityPlan.json'),
    setActivity: function(data){this.Activity = data}
}

// This function will check for the
// specfic activity in the database,
// that'll be deleted.

const HandleDeleteFileControl = async (req, res) => {

    const {id} = req.body
    if (!id) return res.status(400).json({"message":"Please input the ID of the activity you want to delete"});

    const foundActivity = ActivityDB.Activity.find((u) => u.id == id);
    if (!foundActivity){
        return res.status(400).json({"message":`This Activity does not exist our database`});

    }

    const filterActivity = ActivityDB.Activity.filter((x) => x.id !== foundActivity.id);
    ActivityDB.setActivity(filterActivity);


    try {
        await fsPromises.writeFile(path.join(__dirname, '..','..','Models','ActivityPlan.json'), JSON.stringify(ActivityDB.Activity));
        res.json({message:`Activity ${id} is deleted`});
    } catch(err){
        console.error(err)
        res.sendStatus(500);
    }

}

module.exports = {HandleDeleteFileControl}

// end of DeleteFileControl.js