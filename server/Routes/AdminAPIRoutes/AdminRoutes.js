// start of AdminRoutes.js

// create a varaible to import express; import 
// function library express.Router

const express = require('express');
const router = express.Router();

// create a variable to import config Roles list, verifyJWT
// and verify roles

const {verifyJWT} = require ('../../Middleware/verifyJWT');
const ROLES_LIST = require('../../config/Roles_list');
const verifyRoles =  require('../../Middleware/verifyRoles');


// create an object variable to import the following:
// GetAdminControl, UpdateAdminControl, and DeleteAdminControl

const {GetAdminControl} = require ('../../Controller/UserControllers/GetAdminControl.js');
const {UpdateAdminControl} = require('../../Controller/UserControllers/UpdateAdminControl.js');
const {DeleteAdminControl} = require('../../Controller/UserControllers/DeleteAdminControl.js');
const { verify } = require('jsonwebtoken');


 // create a route url route for using GET, UPDATE, and DELETE

router.route('/get')
    .get(verifyJWT, verifyRoles(ROLES_LIST.Admin), GetAdminControl)

router.route('/update')
    .put(verifyJWT,verifyRoles(ROLES_LIST.Admin), UpdateAdminControl)

router.route('/delete')
    .delete(verifyJWT,verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Administrator),DeleteAdminControl)

  

module.exports = router;

// End of AdminRoutes.js
