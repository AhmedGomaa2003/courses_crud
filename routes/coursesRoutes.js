const express = require("express");

// const app = express();
const validationSchema = require("../middleware/validationSchema");
const courseControllers = require("../controllers/courses.controllers");
const router = express.Router();

const allowedTo = require("../middleware/allowedTo");
const userRoles = require("../utils/usersRoles");
const verifyToken = require("../middleware/verifyToken");

router.route("/")
            .get(verifyToken, allowedTo(userRoles.ADMIN, userRoles.INSTRUCTOR), courseControllers.getAllCourses)
            .post(validationSchema,allowedTo(userRoles.ADMIN), courseControllers.addCourse);


router.route("/:courseId")
                      .get(verifyToken, allowedTo(userRoles.ADMIN, userRoles.INSTRUCTOR), courseControllers.getCourse)
                      .patch(verifyToken,allowedTo(userRoles.ADMIN), courseControllers.updateCourse)
                      .delete(verifyToken,allowedTo(userRoles.ADMIN), courseControllers.deleteCourse);

module.exports = router;
