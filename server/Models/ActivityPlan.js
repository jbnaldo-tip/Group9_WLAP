const { default: mongoose } = require('mongoose');
const { stringify } = require('qs');
const activitySchema = new mongoose.Schema({


    SemesterAndSchoolYear: {
        type: String,
        required: true
    },

    WeekProgression: {
        type: String,
        required: true
    },

    CourseCode: {
        type: String,
        required: true
    },

    CourseDescription: {
        type: String,
        required: true
    },

    Module: {
        type: String,
        required: true
    },

    Topic: {
        type: String,
        required: true
    },

    Section: {
        type: String,
        required: true
    },

    Units: {
        type: String,
        required: true
    },

    Professor: {
        type: String,
        required: true
    }


})

module.exports = mongoose.model("activity",activitySchema)