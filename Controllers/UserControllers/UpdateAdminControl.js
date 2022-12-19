// start of UpdateAdminControl.js

const Administrator = require('../../Models/Administrator.js')
const path = require('path')
const { default : mongoose}  = require('mongoose');


// import the admin database


// create a function that'll update the admin database
const UpdateAdminControl= async (req, res, next) => {
    let AdministratorID = req.body.AdministratorID


    let updatedAdmin = {
        Email: req.body.Email,
        Password: req.body.Password,
        Surname: req.body.Surname,
        Firstname: req.body.Firstname
    }

    Administrator.findByIdAndUpdate(AdministratorID,{$set: updatedAdmin})
    .then(() => {
        res.json({
            message: 'This user is updated successfully'
        })
    }) .catch(error => {
        res.json({
            message: 'An error occured within the database'
        })
    })
 
};

module.exports = {UpdateAdminControl}

// end of UpdateAdminControl.js
