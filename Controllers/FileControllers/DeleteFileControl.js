// start of DeleteFileControl.js

const mongoose = require("mongoose"),
express = require("express"),
router = express.Router();

// Lesson Plan

const lessonSchema = require ("../Models/LessonPlan.json");

// Delete file

router.delete("/delete-file/:id",
(req, res, next) => {
  lessonSchema.findByIdAndRemove(
      req.params.id, (error, data) => {
    if (error) {
     return next(error);
    } else {
      res.status(200).json({
        msg: data,
      }); 
    }
  });
});

module.exports = router;

// end of DeleteFileControl.js
