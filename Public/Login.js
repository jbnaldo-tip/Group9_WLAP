// Start of Login.js

// create a function that will display if login is successful, and login failed

function validate()
{
    var username=document.getElementById("Username").value;
    var password=document.getElementById("Password").value;

    if(Username=="admin" && Password=="admin123")
    {
        alert("Login Sucess!");
        return false;
    }
    else
    {
        alert("Login Failed!");
    }
}

//End of Login.js