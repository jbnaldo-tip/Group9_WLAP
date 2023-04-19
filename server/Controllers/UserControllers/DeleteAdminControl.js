// Start of DeleteAdminControl.js

const path = require('path');
const {default: mongoose} = require('mongoose');
const Administrator = require ('../../Models/Administrator.js');
const { ObjectId } = require('mongodb');

//Create variable administrator DB, the usual stuffs


const HandleDeleteAdminControl = async (req, res) => {

    // the Administrator has the power to do it all basically...
    //import json data
    const {Email, Password} = req.body;
    

    // verify if the credentials is complete
    if(!Email || !Password) return res.status(400).json({message:"Empty input credential is not accepted! Please try again!"});
    

    // if the admin does exist;
    const foundAdmin = await Administrator.findOneAndDelete ({
        Email: Email,
        Password: Password
    }).exec();
    console.log(foundAdmin)

    if (!foundAdmin) return res.status(400).json({"message":`This user does not exist within the database`});


    try {
    

        res.json({message: `This User ${Email} is deleted`});
    } catch(err){
        console.error(err)
        res.sendStatus(500); 
    
    
    }


}

module.exports = {HandleDeleteAdminControl}

// end of DeleteAdminControl.js