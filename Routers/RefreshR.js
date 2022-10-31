const router = require('express').Router();

const e = require('express');


const {HandleRefreshToken} = require('../Controller/RefreshController.js');

router.route('/')


    .post(HandleRefreshToken);

module.exports = router;