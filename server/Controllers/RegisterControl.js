// Start of RegisterController.js

// note use const to create instance of the class


// use fs for async; async is basically multitasker


const Administrator = require('../Models/Administrator.js')
const path = require('path');
const { default: mongoose } = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


// Create HandleRegisterControl function variable for it to 
// asynchronus e.g (req or request ; res or respond)

const HandleRegisterControl  = async(req, res, next) => {
    

    // import the json data user and password, req.body

    const{Email, Password} = req.body;
    const{Firstname, Surname} = req.body;


    //Verify if input credentials is finished

    if(!Email || !Password) return res.status(400).json({message: "Invalid Username or Password."});
    if(!Firstname || !Surname) return res.status(400).json({message: "Please Enter your Firstname and Surname"});
    
    //Verify if admin exist within the database

    const foundAdmin = await Administrator.findOne({
        Email: Email
    }).exec()
    console.log(foundAdmin)

    // If admin exist in database, prompt an error message/banners

    if(foundAdmin) return res.status(400). json({message: `This User ${Email} is Already taken!`});

    try{

    await new Administrator ({
        Email: req.body.Email,
        Password: req.body.Password,
        Surname: req.body.Surname,
        Firstname: req.body.Firstname

        
    }).save(); 

    
        res.json({message: "Your Registration is successful! You're now registered!"});
    } catch(err) {
            console.error(err)
            res.sendStatus(500);

        }
    }


// End of RegisterController.js

module.exports = {HandleRegisterControl}












