// Start of RegisterController.js

// note use const to create instance of the class


// use fs for async; async is basically multitasker


const Administrator = require('../Models/Administrator.js')
const path = require('path');
const { default: mongoose } = require('mongoose');


// Create HandleRegisterControl function variable for it to 
// asynchronus e.g (req or request ; res or respond)

const HandleRegisterControl  = async(req, res) => {

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

    //const encryptPassword = await bcrypt.hash (Password, 12);

    await new Administrator ({
        Email: Email,
        Password: Password,
        Surname: Surname,
        Firstname: Firstname,

        
    }).save(); 

        // create a function that will generate a specific id and
        // will encrypt/hash the password
    
        res.json({message: "Your Registration is successful! You're now registered!"});
    } catch(err) {
            console.error(err)
            res.sendStatus(500);

        }
    }


// End of RegisterController.js

module.exports = {HandleRegisterControl}












