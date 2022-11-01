// Start of DeleteAdminControl.js

const fsPromises = require('fs').promises;

const path = require('path');

//// Create variable administrator DB, the usual stuffs

const AdminDB = {

    Admin: require ('../Models/Administrator.json'),

    setAdmin: function(data){this.Admin = data}

}

const HandleDeleteAdminControl = async (req, res) => {

    // the Administrator has the power to do it all basically...

    //import json data

    const {id, Username} = req.body


    // verify if the credentials is complete
    if(!id  || !Username) return res.status(400).json({message:"Username credential is empty! Please input your username!"});

    // if the admin does exist;
    const foundAdmin = AdminDB.Admin.find((u) => u.id == id);

    // isolate the name of the admin by filtering

    const filterAdmin = AdminDB.Admin.filter((x) => x.id !== foundAdmin.id);


    // call the variable object to overwrite inside the Admin database,
    // and also to add new admin

    AdminDB.setAdmin(filterAdmin);



    // create function that will catch error so that the entire system will not be stopped.

    try {

        await fsPromises.writeFile(path.join(__dirname, '..','Models','Administrator.json'), JSON.stringify(AdminDB.Admin));
        res.json({message: `Your Username ${Username} is deleted`});
    } catch(err){
        console.error(err)
        res.sendStatus(500); 
    
    
    }





}