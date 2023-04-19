const { default: mongoose } = require('mongoose');
const administratorSchema = new mongoose.Schema({

    Email: {
        type: String,
        required: true
        
    },

    Password: {
        type: String,
        required: true
    },

    Surname: {
        type: String,
        required: true
    },

    Firstname: {
        type: String,
        required: true
    },

    refresherToken: {
        type: String
    }

})


module.exports = mongoose.model("administrator",administratorSchema)