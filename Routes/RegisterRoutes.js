// Start of RegisterRoutes.js

//Use function router to import express and function Router
const router = require('express').Router();
const {HandleRegisterControl} = require('../Controllers/RegisterControl.js');

//Using function router to use route library to directory root "(/)"
router.route('/')
    //para makapag post at gamitin si HandleRegisterController sa Controller Folder
    .post(HandleRegisterControl);


//Export as objects lahat ng laman neto kase JSON file yung tinatawag neto "Line 7"
module.exports = router;

// End of RegisterRoutes.js