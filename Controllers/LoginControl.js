// Login


const fsPromises = require ('fs').promises;

const bcrypt = require('bcrypt');

const path = require ('path');

const JWT = require ('jsonwebtoken');


// End Login

// Create variable administrator DB

const AdminDB ={
    
    //import file of user data. json

    Prof: require ('../Models/Administrator.json'),

    //set to call data from folder name 

    setProf: function(data){this.Admin = data}

}

// create function that will handle login control w/ request and response


const HandleLoginControl  = async(req, res) =>{

    // import json data user and pass req. body

    const {Username, Password} = req.body;

    // verify input credentials of the admin/user to login

    if (!Username || !Password) return res.status(400).json({message:"Invalid Username or Password."});


    // create a function if Admin exist in the database

    const foundAdmin = AdminDB.Admin.find((u) => u.Username == Username);

    // if Admin = true but no authorization

    const match = bcrypt.compare(Password, foundAdmin.Password);

    // if user = true and pass = true, give token to admin to allow authorization
    
    if (match){

        try{

            // Create a function to call  the username

            const payload = {

                //call json data username
                Username: Username
            }

            // create an inscribed token to allow user to access

            const accessToken = JWT.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
                
                //encrypt
                algorithm: "HS256",
                expiresIn: "60s"
            
            });

            // refresh the token after it expires for 1 min

            const refresherToken = JWT.sign(payload, porcess.env.REFRESH_TOKEN_SECRET,{

                //encrypt
                algorithm: "HS256",
                expiresIn: "1d"
            });

            // add refresherToken to Admin or User
            
            const foundAdminWithToken = {...foundAdmin, refresherToken: refresherToken};

            const filteredAdmin = AdminDB.Admin.filter((u) => u.Username !== Username);

            AdminDB.setADdmin([...filteredAdmin, foundAdminWithToken]);

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


module.exports = {HandleLoginControl}



