// Start of LoginControl.js


const Administrator = require('../Models/Administrator.js');
const {default: mongoose} = require('mongoose');
const bcrypt = require('bcrypt');
const path = require ('path');
const JWT = require ('jsonwebtoken');


// Create variable administrator DB
const AdminDB ={
    
    //import file of user data. json
    Admin: require ('../Models/Administrator.json'),

    //set to call data from folder name 
    setAdmin: function(data){this.Admin = data}

}

// create function that will handle login control w/ request and response


const HandleLoginControl  = async(req, res) =>{

    // import json data user and pass req. body
    const {Email, Password} = req.body;
    if (!Email || !Password) return res.status(400).json({message: "Invalid Email or Password."});
    
    const foundAdmin = AdminDB.Admin.find((u) => u.Email == Email);
    if (!foundAdmin) return res.sendStatus(401);

    // if user = true and pass = true, give token to admin to allow authorization
    const match = bcrypt.compare(Password, foundAdmin.Password);


    
    if (match){

        try{

            // Create a function to call  the username
            const payload = {

                //call json data username
                Username: Username
            }

            // create an inscribed token to allow user to access
            const accessToken = JWT.sign(payload, process.env.ACCESS_TOKEN_KEY, {
                
                //encrypt
                algorithm: "HS256",
                expiresIn: "60s"
            
            });

            // refresh the token after it expires for 1 min
            const refresherToken = JWT.sign(payload, process.env.REFRESHER_TOKEN_KEY,{

                //encrypt
                algorithm: "HS256",
                expiresIn: "1d"
            });

            // add refresherToken to Admin or User
            
            const foundAdminWithToken = {...foundAdmin, refresherToken: refresherToken};
            const filteredAdmin = AdminDB.Admin.filter((u) => u.Username !== Username);
            AdminDB.setAdmin([...filteredAdmin, foundAdminWithToken]);

            await fsPromises.writeFile(

                path.join(__dirname, "..", 'Models','Administrator.json'),
                JSON.stringify(AdminDB.Admin)
            )

            //send the refreshed or new token as cookie
            res.cookie('jwt', refresherToken, {
                maxAge: 24 * 60 * 60 * 1000,
                httpOnly: true,
            })

            //give access token as json
            res.status(200).send("Login Success!").json({accessToken: accessToken});

        } catch(err){
            console.error(err)
            res.sendStatus(500)
        }

     }
    
}

// End of LoginControl.js

module.exports = {HandleLoginControl}



