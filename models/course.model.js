// models/course.model.js
const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
    title: { type: String, required: true },
    price: { type: Number, required: true },
});

// إضافة المعامل الثالث "courses" للتأكد من الربط بالجدول الصحيح
module.exports = mongoose.model("Course", courseSchema, "courses");