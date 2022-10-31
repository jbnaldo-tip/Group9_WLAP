

//Use function router to import express and function Router
const router = require('express').Router();

const {HandleRegistrationController} = require('../Controller/RegistrationController.js');

//Using function router to use route library to directory root "(/)"
router.route('/')
    //para makapag post at gamitin si HandleRegistrationController sa Controller Folder
    .post(HandleRegistrationController)


//Export as objects lahat ng laman neto kase JSON file yung tinatawag neto "Line 7"
module.exports = router;