// Start of UpdateFileRoutes.js

const router = require('express').Router();
const {UpdateFileControl} = require('../../Controllers/FileControllers/UpdateFileControl.js');

router.route('/')
    .put(UpdateFileControl);
    

module.exports = router;



// End of UpdateFileRoutes.js
