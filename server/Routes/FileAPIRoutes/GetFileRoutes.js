// Start of GetFileControl

const router = require('express').Router();
const {GetFileControl} = require('../../Controllers/FileControllers/GetFileControl.js');

router.route('/')
    .get(GetFileControl);


module.exports = router;



// End of GetFileControl
