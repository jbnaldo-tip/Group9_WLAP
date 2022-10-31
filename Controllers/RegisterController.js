// note use const to create instance of the class


// use fs for async; async is basically multitasker

const fsPromises = require ('fs').promises;

const path = require('path');


// Set variable 'database' as function variable for calling user

const AdminDB ={

    // importing files of user data.json
    
    Admin: require('../Models/Administrator.json'),

    // setUsers call data from folder name Admin.users
    
    setAdmin: function(data){this.Admin = data}

}


// Create HandleRegisterControl function variable for it to 
// asynchronus e.g (req or request ; res or respond)

const HandleRegisterController  = async(req, res) => {

    // import the json data user and password, req.body

    const{Username, Password} = req.body;


    //Verify if input credentials is finished

    if(!Username || !Password) return res.status(400).json({message: "Invalid Username or Password."});
    
    //Verify if admin exist within the database

    const foundAdmin = AdminDb.Admin.find((u)=> u.Username == Username);

    // If admin exist in database, prompt an error message/banners

    if(foundAdmin) return res.status(400). json({message: "This User $(Username) is Already taken!"});
    // if admin not exist within the database,
    // prompt to register

    const newAdmin = {
        Username: Username,
        Password: Password

        
    } 

    // call the variable object database to overwrite 
    // inside the AdminDB.Admin, and to add
    // newAdmin

    AdminDB.setAdmin([...AdminDB.Admin, newAdmin]);
    


    // to detect errors thereby the whole system
    // will not halt

    try{

        await fsPromises.writeFile(path.join(__dirname, '..','Models','Admin.json'), JSON.stringify(AdminDB, Admin));
        res.json({message: "Your Registration is successful! You're now registered!"})
    }catch(err) {
            console.error(err)
            res.sendstatus(500);

        }
    }












