// Start of DeleteFileRoutes.js

const router = require('express').Router();
const {HandleDeleteFileControl} = require('../../Controllers/FileControllers/DeleteFileControl.js');

router.route('/')
    .delete(HandleDeleteFileControl);


module.exports = router;

// End of DeleteFileRoutes.js
