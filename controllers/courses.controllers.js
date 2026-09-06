const {  validationResult } = require("express-validator");
const Course = require("../models/course.model");
const httpStatusText= require("../utils/httpStatusText");
const asyncWrapper = require("../middleware/asyncWrapper");

const AppError = require("../utils/appError");

const getAllCourses = asyncWrapper( async (req, res) => {

  //this is a pagination

  const query = req.query;
  const limit = parseInt(query.limit) || 10; // Default limit to 10 if not provided
  const page = parseInt(query.page) || 1; // Default page to 1 if not provided
  const skip = (page - 1) * limit; // Calculate the number of documents to skip


  const courses = await Course.find({}, {"__v": 0}).limit(limit).skip(skip);
  res.json({ status: httpStatusText.SUCCESS, data :{ courses }});
   
});

const getCourse = asyncWrapper(
  
  async (req, res , next) => {

  const course = await Course.findById(req.params.courseId);
    if (!course) {
      const error = AppError.create("this course not found", 404, "Not Found");
      return next(error);
  }
   return res.json({ status: httpStatusText.SUCCESS, data :{ course }});
  
});

const addCourse = asyncWrapper(async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const error = AppError.create(errors.array(), 400, httpStatusText.FAIL);
    return next(error);
  }

  const newCourse = new Course(req.body);
  await newCourse.save();

  res.status(201).json({ status: httpStatusText.SUCCESS, data: { course: newCourse } });
});
  
const updateCourse = asyncWrapper( async (req , res)=>{
  
  
    const courseId = req.params.courseId;
    
    let updatedCourse = await Course.updateOne({ _id: courseId }, { $set: { ...req.body } },)
      if (!updatedCourse) {
      res.status(404).json({ status: httpStatusText.FAIL, data: { course: "this course not found" } });
    };
  
    return res.status(200).json({ status: httpStatusText.SUCCESS, data: { course: updatedCourse } });
  });
const deleteCourse = asyncWrapper( async (req , res)=>{
  // const courseId = +req.params.courseId;
  // courses = courses.filter((course)=>{course.id !== courseId});
  await Course.deleteOne({ _id: req.params.courseId });
  
  res.status(200).json({ status: httpStatusText.SUCCESS, data: null });
});

module.exports = {
getAllCourses,
getCourse,
addCourse,
updateCourse,
deleteCourse
}
