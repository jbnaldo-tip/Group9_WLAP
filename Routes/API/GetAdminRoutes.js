// start of GetAdminRoutes.js


const router = require('express').Router();
const {GetAdminControl} = require('../../Controllers/UserControllers/GetAdminControl.js');


router.route('/')
     .get(GetAdminControl);


module.exports = router;


// end of GetAdminRoutes.js
