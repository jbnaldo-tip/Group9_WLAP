// start of UpdateAdminControl.js

const fsPromises = require('fs').promises;
const path = require('path')

// import the admin database

const AdminDB = {
    Admin: require('../../Models/Administrator.json'),
    setAdmin: function(data){this.Admin = data}

}


// create a function that'll update the admin database

const UpdateAdminControl= async (req, res) => {


    const Admins = AdminDB.Admin.find (Admin => Admin.id == parseInt(req.body.Id));

    // if the admin is not found, send error status and message
    if (!Admins){

        return res.status(400).json({"message":`This User ${req.body.id}not found`});
    }


    // this if statement would request for an input data that need a change or
    // update in the database

    if(req.body.Firstname) Admins.Firstname = req.body.Firstname;
    if(req.body.Surname)Admins.Surname = req.body.Surname;
    if(req.body.Roles)Admins.Roles= req.body.Roles;
    if(req.body.Password)Admins.Password = req.body.Password;

    // Create a function that will call out the admin, admin database, and
    // filter admin to set the integer

    const filterArray = AdminDB.Admin.filter(Admins => Admins.id !== parseInt(req.body.id));

    // construct unsorterarray

    const unsortArray = [...filterArray, AdminDB.Admin];


Admin.setAdmin(unsortArray.sort((a,b) => a.id > b.id ? 1 :a.id < b.id ?-1: 0));
    res.json(Admin.Admin);
    await fsPromises.writeFile(path, join(__dirname,'..','Modles','Administrator.json'), JSON.stringify(AdminDB.Admin));


}

module.exports = {UpdateAdminControl}

// end of UpdateAdminControl.js
