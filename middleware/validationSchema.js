const { body } = require("express-validator");

const validationSchema = [
  body("title")
    .notEmpty()
    .withMessage("title is required")
    .isLength({ min: 2 })
    .withMessage("must be title >2 char"),
  body("price")
    .notEmpty()
    .withMessage("price is required")
    .isNumeric()
    .withMessage("price must be a number"),
];

module.exports = validationSchema;