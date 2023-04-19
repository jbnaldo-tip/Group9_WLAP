// Start of LoginControl.js



const {default: mongoose} = require('mongoose');
const express = require('express');
const { Admin } = require('mongodb');
const bcrypt = require('bcrypt');
const Administrator = require('../Models/Administrator.js');
const { u } = require('tar');


// Create an instance of Express app
const app = express();

// Set up middleware to parse JSON data in request body
app.use(express.json());


// Create variable administrator D

// create function that will handle login control w/ request and response


const HandleLoginControl  = async(req, res, next) =>{

  try {
    const check = await Administrator.findOne({Email: req.body.Email})

    if(check.Password === req.body.Password){
       return res.status(200).json ({message: `Login Succesful`})
    }
    else {
       return res.status(400).json ({message: `Password does not match`})
    }

  }
  catch {
      return res.status(400).json ({message: `Email does not exist`})
  }





};

// End of LoginControl.js

module.exports = {HandleLoginControl}



