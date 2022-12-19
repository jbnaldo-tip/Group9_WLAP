// start of GetAdminControl.js


// create a variable to import administrator or admin data
const data = {};

const { response } = require('express');
// call the json file and create a function to response all admin or administrator data
const {default: mongoose} = require('mongoose');
const Administrator = require('../../Models/Administrator.js');

const GetAdminControl = async (req, res, next) => {
   Administrator.find()
   .then(response => {
        res.json({
            response
        })
   })
   .catch(error => {
     res.json({
        message: `An error occured within the database`
     })
   })

   
  
   };




    

    

module.exports = {GetAdminControl}