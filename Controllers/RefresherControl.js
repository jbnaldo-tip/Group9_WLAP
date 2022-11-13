// Start of RefresherController.js

// import the jsonwebtoken using JWT variable
const JWT = require('jsonwebtoken');


// set variable AdminDB as func var 
const AdminDB = {

    // same thing in RegisterController.js, import the user data.json
    Admin: require ('../Models/Administrator.json'),

    // same in the RegisterController.js
    setAdmin: function(data){this.Admin = data}


    
}


// create a function that will handle token request and response
const HandleRefresherToken = (req,res ) => {


    // Create function to request cookies using variable cookies
    const cookies = req.cookies;

        
    if(!cookies?.jwt) return res.sendstatus(401);


    // create a function that will refesh token cookies.jwt
    const refresherToken = cookies.jwt;


    // use console log to test    
    const foundAdmin = AdminDB.Admin.find((u) => u.refresherToken == refresherToken);

    // console log, Admin found
    if(!foundAdmin) return res.sendStatus(403);

    JWT.verify(refresherToken, process.env.REFRESHER_TOKEN_KEY, {
        algorithms: "HS256"


    }, (err, decoded) => {

        if ( err || foundAdmin.Username !== decoded.Username) return res.sendStatus(403);
        const payload = {
            Username: decoded.Username
        
        };

        const accessToken = JWT.sign(payload, process.env.ACCESS_TOKEN_KEY,{
            algorithm: "HS256",
            expiresIn: "60s"

        });

        res.status(200).json({accessToken: accessToken});

    })

}




module.exports = {HandleRefresherToken}
  
// End of RefresherController.js

