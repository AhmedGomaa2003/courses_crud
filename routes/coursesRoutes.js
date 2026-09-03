const express = require("express");

// const app = express();
const validationSchema = require("../middleware/validationSchema");
const courseControllers = require("../controllers/courses.controllers");
const router = express.Router();

router.route("/")
            .get(courseControllers.getAllCourses)
            .post(validationSchema, courseControllers.addCourse);


router.route("/:courseId")
                      .get( courseControllers.getCourse)
                      .patch(courseControllers.updateCourse)
                      .delete(courseControllers.deleteCourse);

module.exports = router;
