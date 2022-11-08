// Start of LogoutRoutes.js
//
const router = require('express').Router();
const {HandleLogoutControl} = require('../Controllers/LogoutControl.js');

//Using function router to use route library to directory root "(/)"
router.route('/')
    //para makapag post at gamitin si HandleLogoutControl sa Controller Folder
    .post(HandleLogoutControl);


//Export as objects lahat ng laman neto kase JSON file yung tinatawag neto "Line 7"
module.exports = router;


// End of LogoutRoutes.js
