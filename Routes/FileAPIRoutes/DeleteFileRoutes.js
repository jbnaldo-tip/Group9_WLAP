// Start of DeleteFileRoutes.js

const router = require('express').Router();
const {DeleteFileControl} = require('../../Controllers/FileControllers/DeleteFileControl');

router.route('/')
    .delete(DeleteFileControl);


module.exports = router;


// End of DeleteFileRoutes.js

