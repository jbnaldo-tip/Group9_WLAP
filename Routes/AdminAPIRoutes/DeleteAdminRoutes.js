// Start of DeleteAdminRoutes.js


const router = require('express').Router();
const {HandleDeleteAdminControl} = require('../../Controllers/UserControllers/DeleteAdminControl.js');

router.route('/')
     .delete(HandleDeleteAdminControl);

module.exports = router;


// End of DeleteAdminRoutes.js