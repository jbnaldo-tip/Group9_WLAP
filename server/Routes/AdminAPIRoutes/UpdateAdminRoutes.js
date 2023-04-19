// start of UpdateAdminRoutes.js


const router = require('express').Router();
const {UpdateAdminControl} = require('../../Controllers/UserControllers/UpdateAdminControl.js');

router.route('/')
     .put(UpdateAdminControl);

module.exports = router;



// end of UpdateAdminRoutes.js
