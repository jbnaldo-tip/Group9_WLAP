//=========================================================================================================================================================================

const fsPromises = require('fs').promises;

const bcrypt = require('bcrypt');

const path = require('path');

const JWT = require('jsonwebtoken')

//========================================================================================================================================================================



//========================================================================================================================================================================
//creating variable professorDB to callout professor.json file
const ProfDB ={
    //users variable importing "File of User data .json"
    Prof: require('../Models/Professor.json'),

    //setUsers call data from folder name this.users
    setProf: function(data){this.Prof = data}
}
//=======================================================================================================================================================================
//to create function to handle the login controller with asyncronous req,res
const HandleLoginController = async(req, res) =>{

    //===================================================================================================================================================================
    //importing JSON data Username and Password request.body
    const {Username, Password} = req.body;

    //Validate input credentials of the prof in order to login
    if(!Username || !Password) return res.status(400).json({message:"Username and Password are required."});
    //===================================================================================================================================================================



    //===================================================================================================================================================================
    //Create a function foundProf to look if the prof is existing in the DB, ProfDB line 15 is looking for object in Prof.json and find all available username
    const foundProf = ProfDB.Prof.find((u) => u.Username == Username);

    //if prof is found and it does not have authorization, do this.
    if(!foundProf) res.sendStatus(401);
    //===================================================================================================================================================================



    //===================================================================================================================================================================
    //Create a function match to compare Password inputted if it is available in foundProf.Password
    const match = bcrypt.compare(Password, foundProf.Password);

    //If it the user exist and password match give token to Professor to allow access
    if(match){

        try{
            //Create a function named payload to call USERNAME
            const payload = {

                //calling JSON data USERNAME
                Username: Username
            }
            
            //Create a signed token to allow user to access JWT.sign (payload is the Username, CALL .env for the access token)
            const accessToken = JWT.sign(payload, process.env.ACCESS_TOKEN_SECRET,{
                //Encrypting Algorithm with its expiry
                algorithm: "HS256",
                expiresIn: "30s"
            });

            //Refreshes the token after the expirty (payload is the username, calling .env for the refresh token)
            const refreshToken = JWT.sign(payload, process.env.REFRESH_TOKEN_SECRET,{
                //Encrypting Algorith with its expiry
                algorithm: "HS256",
                expiresIn: "1d"
            });

            //add refreshToken to Prof
            const foundProfWithToken = {...foundProf, refreshToken: refreshToken};
            //
            const filteredProf = ProfDB.Prof.filter((u) => u.Username !== Username);
            
            ProfDB.setProf([...filteredProf, foundProfWithToken]);

            await fsPromises.writeFile(

                path.join(__dirname, "..",'Models', 'Professor.json'),

                JSON.stringify(ProfDB.Prof)
            )

            //Send RefreshToken as Cookie
            res.cookie('jwt', refreshToken, {
                //duration of the refresh cookie
                maxAge: 24 * 60 * 60 * 1000,
                    
                httpOnly: true,
            })

            //Send AccessToken as JSON
            res.status(200).send("Login Successfuly").json({accessToken: accessToken});


        } catch(err){
            console.error(err)
            res.sendStatus(500)
        }
            
    }
    
}
//==========================================================================================================================================================================
module.exports = {HandleLoginController}