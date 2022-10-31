//verify 

const JWT =require('jsonwebtoken');

const verifyJWT = (res, req, next) => {
    
    const authHeader =req.headers.authorization || req.headers.authorization;



    //confirm if the token has a correct format
    
    if(!authHeader?.startsWith('Bearer')) return res.sendStatus(401);

    console.log(authHeader);

    //claim token

    const token = authHeader.split(' ')[1];

    //verify token

    JWT.verify(token, process.env.ACCESS_TOKEN_SECRET, {

        algorithm: "HSA256"




    }, (err, decode) => {
        if (err) return res.sendStatus(403);

        req.Username = decode.Username;

        next();

    })

}


module.exports = {verifyJWT}
