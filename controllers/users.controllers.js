const asyncWrapper = require("../middleware/asyncWrapper");
const httpStatusText = require("../utils/httpStatusText");
const user = require("../models/user.model");
const AppError = require("../utils/appError");


const getAllUsers = asyncWrapper( async (req, res) => {

  //this is a pagination

  const query = req.query;
  const limit = parseInt(query.limit) || 10; // Default limit to 10 if not provided
  const page = parseInt(query.page) || 1; // Default page to 1 if not provided
  const skip = (page - 1) * limit; // Calculate the number of documents to skip


  const users = await user.find({}, {"__v": 0}).limit(limit).skip(skip);
  res.json({ status: httpStatusText.SUCCESS, data :{ users }});
   
})
const registerUser = asyncWrapper(async (req, res, next) => { 
    const oldUser = await user.findOne({ email: req.body.email });
    if (oldUser) {
         
        const error = AppError.create("User already exists. Please login.", 404, "Not Found");
              return next(error);
  
    }
    
    const { firstname, lastname, email, password } = req.body;
    const newUser = new user({
        firstname,
        lastname,
        email,
        password
    });

    await newUser.save();
    res.status(201).json({ status: httpStatusText.SUCCESS, data: { user: newUser } });
});

const loginUser = asyncWrapper(async (req, res) => { });

module.exports = {
  getAllUsers,
  registerUser,
  loginUser
}
