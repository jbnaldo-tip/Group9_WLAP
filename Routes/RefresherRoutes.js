//Start of RefresherRoutes.js


// create a function that will import expresss
const router = require('express').Router();

const e = require('express');

const {HandleRefresherToken} = require('../Controllers/RefresherController.js');


router.route('/')


    .post(HandleRefresherToken);

// export as objects 
module.exports = router;

// End of RefresherRoutes.js