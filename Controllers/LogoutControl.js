// Start ofLogoutControl.js

const fsPromises = require('fs').promises;
const path = require ('path');


// Create variable administrator DB, the usual stuffs
const AdminDB = {

    Admin: require('../Models/Administrator.json'),
    setAdmin: function(data){this.Admin = data}

}


//create variable and function to req cookies
const HandleLogoutControl = async(req, res) =>{

// this function is for generating cookies
  const cookies = req.cookies;

  if(!cookies?.jwt) return res.sendStatus(204);

  // this function's purpose is to find cookies
  const refresherToken = cookies.jwt;

  // while this one's purpose is to look for admin/administrator in the database and fine the token
  const foundAdminWithToken = AdminDB.Admin.find((u) => u.refresherToken == refresherToken);

  if (!foundAdminWithToken){
    res.clearCookie('jwt',{
        httpOnly: true,
        sameSite: 'None'

    })
    return res.sendStatus(204);
  }
   // this function will delete the refersher token or token in shor
   // so that the user/admin can logout of the site and remove access.


   // note diff = different, hence different admin or 'another person logging in'
   const diffAdmin = AdminDB.Admin.filter((u) => u.refresherToken !== refresherToken);
   
   // note now = current, hence the current admin.
   const nowAdmin = {...foundAdminWithToken, refresherToken: ' '};

   // calling the database which is the AdminDB to set the admin (setAdmin)
   // and to overwrite the content inside the database.
   AdminDB.setAdmin([...diffAdmin, nowAdmin]);

   //set await to avoid bottlenecking
   await fsPromises.writeFile(
    
       path.join(__dirname, '..', 'Models','Administrator.json'),
       JSON.stringify(AdminDB.Admin)
   )

   //  clear the cookie cache. This will will prohibit the user to access after logging out..

   res.clearCookie('jwt',{
       httpOnly: true,
       sameSite: 'None', 

   });

   
   res.status(200).send("Successfully Logged out!");

   res.sendStatus(204);


}

// End of LogoutControl.js

module.exports = {HandleLogoutControl}
