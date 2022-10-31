

const JWT = require('jsonwebtoken')

const verifyJWT = (req, res, next) =>{

    const authHeader = req.headers.authorization || req.headers.authorization;

    

    //Check Token if it has proper format
    if(!authHeader?.startsWith('Bearer ')) return res.sendStatus(401);

    console.log(authHeader);
    //Get the token
    const token = authHeader.split(' ')[1];

    //verify Token
    JWT.verify(token, process.env.ACCESS_TOKEN_SECRET,{


        algorithm: 'HS256'


    }, (err, decode) => {
        if(err) return res.sendStatus(403);

        req.Username = decode.Username;

        next();
    })
}

module.exports = {verifyJWT}