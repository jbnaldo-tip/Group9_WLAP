// Start of CreateFileRoutes.js

const router = require('express').Router();
const {CreateFileControl} = require('../../Controllers/FileControllers/CreateFileControl.js');

router.route('/')
    .post(CreateFileControl);


module.exports = router;





// End of CreateFileRoutes.js
