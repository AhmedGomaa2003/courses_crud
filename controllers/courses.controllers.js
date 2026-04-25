const {  validationResult } = require("express-validator");
const Course = require("../models/course.model");

const getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find();
    // console.log("البيانات القادمة من الداتا بيز:", courses); // سطر للتأكد
    res.json(courses);
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
     return res.status(404).json({ ms: "this course not found" });
    }
     return res.json(course);

  } catch  {
        res.status(400).json({ msg: "invaled object id" });
  
  }
};
const addCourse = async (req, res) => {
   
    const errors = validationResult(req);
    if(!errors.isEmpty()){
          return res.status(400).json(errors.array());
         
    }
  const newCourse = new Course(req.body);
  await newCourse.save();

    res.status(201).json(newCourse);
  };
const updateCourse = async (req , res)=>{
  
  try {
    const courseId = req.params.courseId;
    
    let updetedCourse = await Course.updateOne({ _id: courseId }, { $set: { ...req.body } },)
      if (!updetedCourse) {
      res.status(404).json({ ms: "this course not found" });
    };
    
    return res.status(200).json(updetedCourse);
  } catch  {
   return res.status(400).json({ msg: "invaled object id" });
  } 

};
const deleteCourse = async (req , res)=>{
  // const courseId = +req.params.courseId;
  // courses = courses.filter((course)=>{course.id !== courseId});
  await Course.deleteOne({ _id: req.params.courseId });
  
  res.status(200).json({ ms: "delete is success" })
};

module.exports = {
getAllCourses,
getCourse,
addCourse,
updateCourse,
deleteCourse
}
