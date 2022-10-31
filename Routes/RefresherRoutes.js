const router = require('express').Router();

const e = require('express');


const {HandleRefresherToken} = require('../Controllers/RefresherController.js');

router.route('/')


    .post(HandleRefresherToken);

module.exports = router;