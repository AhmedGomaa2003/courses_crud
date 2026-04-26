const {  validationResult } = require("express-validator");
const Course = require("../models/course.model");
const { SUCCESS, FAIL, ERROR } = require("../utils/httpStatusText");

const getAllCourses = async (req, res) => {
  const query = req.query;
  const limit = parseInt(query.limit) || 10; // Default limit to 10 if not provided
  const page = parseInt(query.page) || 1; // Default page to 1 if not provided
  const skip = (page - 1) * limit; // Calculate the number of documents to skip
  try {
    const courses = await Course.find({}, {"__v": 0}).limit(limit).skip(skip);
    // console.log("البيانات القادمة من الداتا بيز:", courses); // سطر للتأكد
    res.json({ status: SUCCESS, data :{ courses }});
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getCourse = async (req, res) => {
  // before database
  // const courseId = +req.params.courseId;
  // const course = courses.find((course) => course.id === courseId);
  
  try {
    
    const course = await Course.findById(req.params.courseId);
    if (!course) {
     return res.status(404).json( { status: FAIL, data: { course: "this course not found" } });
    }
     return res.json({ status: SUCCESS, data :{ course }});

  } catch (err) {
        res.status(400).json({status: ERROR, data:null, message: err.message , code : 400 });
  
  }
};
const addCourse = async (req, res) => {
   
    const errors = validationResult(req);
    if(!errors.isEmpty()){
      return res.status(400).json({status: FAIL, data: { errors : errors.array() }});
         
    }
  const newCourse = new Course(req.body);
  await newCourse.save();

    res.status(201).json({ status: SUCCESS, data: { course: newCourse } });
  };
const updateCourse = async (req , res)=>{
  
  try {
    const courseId = req.params.courseId;
    
    let updetedCourse = await Course.updateOne({ _id: courseId }, { $set: { ...req.body } },)
      if (!updetedCourse) {
      res.status(404).json({ status: FAIL, data: { course: "this course not found" } });
    };
    
    return res.status(200).json({ status: SUCCESS, data: { course: updetedCourse } });
  } catch (err) {
   return res.status(400).json({ status: ERROR,  message: err.message });
  } 

};
const deleteCourse = async (req , res)=>{
  // const courseId = +req.params.courseId;
  // courses = courses.filter((course)=>{course.id !== courseId});
  await Course.deleteOne({ _id: req.params.courseId });
  
  res.status(200).json({ status: SUCCESS, data: null });
};

module.exports = {
getAllCourses,
getCourse,
addCourse,
updateCourse,
deleteCourse
}
