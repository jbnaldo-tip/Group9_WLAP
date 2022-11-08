

//Start import

//call back variable set to express to import express
const express = require('express');

//call back variable app to call all imported function of express()
const app = express(); 

//importing local environment
require(`dotenv`).config();

//importing JWT to encrypt password Json Web Token
const {verifyJWT} = require('./Middleware/verifyJWT.js');

//Call back variable cookie parser Importing Cookie parser
const cookieParser = require('cookie-parser');

//set variable of function of path importing "path functions"
const path = require('path')

//set variable of enviornment port to (PORT) and environment (PORT) set to localhost 5050
const PORT = process.env.PORT || 5050;
//End import




//start app

//parse Forms
app.use(express.urlencoded({extended: false}));
//Parse JSON
app.use(express.json());
//function to use absolute file path
app.use(express.static(path.join(__dirname,'Public')));
//Function to attach cookies to client request object
app.use(cookieParser())


// end app




// function app para ilagay ito sa URL"Directory", Calling Routes
app.use('/api/data/register', require('./Routes/RegisterRoutes.js'));
app.use('/api/data/login',require('./Routes/LoginRoutes.js'));
app.use('/api/data/refresh',require('./Routes/RefresherRoutes.js'));
app.use('/api/data/logout',require('./Routes/LogoutRoutes.js'));
app.use('/api/data/delete', require('./Routes/API/DeleteAdminRoutes.js'));
app.use('/api/data/get', require('./Routes/API/GetAdminRoutes.js'));
// gawa ng routes for deleting user! Do not forget! -Denzell



//app.get to response localhost5050 with this HTML
app.get('/LoginPage', (req,res) => {

    res.sendFile(path.join(__dirname,'Views','Login.html'))
})



//User calling function "app.listen" to listen and call out "PORT", (5050) and do the stuffs under 
app.listen(PORT, () => {
    console.log(`---------------------------------------`);
    //TO DISPLAY IN TERMINAL WHAT PORT IT IS LISTENING TO.
    console.log(`      GATHERING PORT! localhost:${PORT}`);
    console.log('---------------------------------------\n');
    // CAN BE FOR AESTHETIC PURPOSE OR BANNER, EITHER WAY YOU WANT
    console.log('          GENERATING SERVER!          \n');
    console.log('---------------------------------------');
    //WILL DISPLAY THE LOCALHOST URL
    console.log(`http://localhost:${PORT}/\t <== ROOT URL`);
    console.log(`---------------------------------------`);
})               




//MVC
//MODEL VIEW CONTROLLER
//MODEL JSON  
//VIEW   HTML CSS
//CONTROLLER DATA FLOW, INformation login page 
//ROUTE .get(./registerlogin)
//app.use()