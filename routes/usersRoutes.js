const express = require("express");

const router = express.Router();

const userControllers = require("../controllers/users.controllers");
const verifyToken = require("../middleware/verifyToken");

router.route("/")
    .get(verifyToken, userControllers.getAllUsers)

router.route("/:usersId")
        .delete(verifyToken, userControllers.deleteUser)


router.route("/register")
        .post(userControllers.registerUser);
            
router.route("/login")
         .post(userControllers.loginUser);
        


module.exports = router;
