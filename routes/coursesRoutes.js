const express = require("express");

// const app = express();
const { body } = require("express-validator");

const courseControllers = require("../controllers/courses.controllers");
const router = express.Router();

router.get("/", courseControllers.getAllCourses);
// git single course
router.get("/:courseId", courseControllers.getCourse);
// create a new course
router.post(
  "/",
  [
    body("title")
      .notEmpty()
      .withMessage("title is required")
      .isLength({ min: 2 })
      .withMessage("must be title >2 char"),
    body("price").notEmpty().withMessage("price is required"),
  ],
  courseControllers.addCourse,
);
// update a course
router.patch("/:courseId", courseControllers.updateCourse);

// delete a course
router.delete("/:courseId", courseControllers.deleteCourse);

module.exports = router;
