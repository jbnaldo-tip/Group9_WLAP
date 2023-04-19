// Start ofLogoutControl.js

const {default: mongoose} = require('mongoose');
const express = require('express');
const session = require('express-session');
const { Admin } = require('mongodb');
const bcrypt = require('bcrypt');
const Administrator = require('../Models/Administrator.js');
const { u } = require('tar');


// Create an instance of Express app
const app = express();

// Set up middleware to parse JSON data in request body

app.use(session({
    secret: '26f7c77e790435bfba1d164557fc8818fbd0208dcefdf956ccd3ac62fac069ca31b55d500145d848e3575eabb0e4b121f45aec27103107e4b54fcee3de3296d3',
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 // 1 day
    }
  }));
//create variable and function to req cookies
const HandleLogoutControl = async (req, res) =>{
    req.session.destroy( err => {
        if (err){
            console.error (err);
        } else{
            res.redirect('/');
        }
    });
};

// End of LogoutControl.js

module.exports = {HandleLogoutControl}
