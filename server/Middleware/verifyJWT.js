// Start of verifyJWT.js

const JWT =require('jsonwebtoken');

const verifyJWT = (res, req, next) => {
    
    const verifyJWT = (req, res, next) => {
        const authHeader = req.header.authentication || req.headers.Authorization;

        // check token if true
        if(!authHeader?.startsWith('Bearer')) return res.sendStatus(401);

        // get token
        const token = authHeader.split(' ')[1];

        // verify Token
        JWT.verify(token, process.env.ACCESS_TOKEN_KEY),{

            algorithm: 'HS256'

        }, (err,decode) => {
        
        if(err) return res.sendStatus(403);

        req.Username = decode.UserInfo.Username;
        req.Roles = decode.UserInfo.roles;

        next ();
        }


    };
}

// End of verifyJWT.js

module.exports = {verifyJWT}
