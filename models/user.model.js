const mongoose = require('mongoose');
const validator = require('validator');
const userRoles = require('../utils/usersRoles');

const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: { 
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: [validator.isEmail,'Invalid email format']  
    },
    password: {
        type: String,
        required: true
    },
   token: {
        type: String,
    },
    role: {
        type: String,
        enum: [userRoles.ADMIN, userRoles.INSTRUCTOR, userRoles.STUDENT],
        default: userRoles.STUDENT
    },
    avatar: {
        type: String,
        default:"uploades/avatar.png"
        
    }

})

module.exports = mongoose.model('User', userSchema);