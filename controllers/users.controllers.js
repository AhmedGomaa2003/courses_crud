const asyncWrapper = require("../middleware/asyncWrapper");
const httpStatusText = require("../utils/httpStatusText");
const user = require("../models/user.model");
const AppError = require("../utils/appError");
const bcrypt = require("bcryptjs");


const getAllUsers = asyncWrapper( async (req, res) => {

  //this is a pagination

  const query = req.query;
  const limit = parseInt(query.limit) || 10; // Default limit to 10 if not provided
  const page = parseInt(query.page) || 1; // Default page to 1 if not provided
  const skip = (page - 1) * limit; // Calculate the number of documents to skip


  const users = await user.find({}, {"__v": 0 , password :false}).limit(limit).skip(skip);
  res.json({ status: httpStatusText.SUCCESS, data :{ users }});
   
})

const deleteUser = asyncWrapper(async (req, res, next) => {
     const userId =   await user.deleteOne({ _id: req.params.usersId });
    
    
  res.status(200).json({ status: httpStatusText.SUCCESS, data: null, message: "User deleted successfully" });
});

const registerUser = asyncWrapper(async (req, res, next) => { 
    const oldUser = await user.findOne({ email: req.body.email });
    if (oldUser) {
         
        const error = AppError.create("User already exists. Please login.", 404, "Not Found");
              return next(error);
  
    }

    const { firstname, lastname, email, password } = req.body;


    const passwordHashed = await bcrypt.hash(password, 10);
    
    const newUser = new user({
        firstname,
        lastname,
        email,
        password: passwordHashed
    });


    await newUser.save();
    res.status(201).json({ status: httpStatusText.SUCCESS, data: { user: newUser } });
});

const loginUser = asyncWrapper(async (req, res,next) => {
    const { email, password } = req.body;

    if (!email || !password) {
            const error = AppError.create("Email and password are required.", 404, "Not Found");
        return next(error);
    }

    const userFound = await user.findOne({ email });
    if (!userFound) {
        const error = AppError.create("User not found. Please register.", 404, "Not Found");
        return next(error);
    }

    const isPasswordValid = await bcrypt.compare(password, userFound.password);
    
    if (!isPasswordValid) {
        const error = AppError.create("Invalid password.", 404, "Not Found");
        return next(error);
    }

    res.status(200).json({ status: httpStatusText.SUCCESS, data: { user: userFound } });
    

 });




module.exports = {
    getAllUsers,
    deleteUser,

  registerUser,
  loginUser
}
