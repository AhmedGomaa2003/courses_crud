const express = require("express");

const router = express.Router();

const userControllers = require("../controllers/users.controllers");
const verifyToken = require("../middleware/verifyToken");
const allowedTo = require("../middleware/allowedTo");
const userRoles = require("../utils/usersRoles.js");


const multer = require("multer");

const diskStorage = multer.diskStorage({
        destination: function (req, file, cb) {
                cb(null, "uploades");
        },
        filename: function (req, file, cb) {
                const EXT = file.mimetype.split("/")[1];
                const fileName = `user-${Date.now()}.${EXT}`;
                cb(null, fileName);
        }
});
const fileFilter = (req, file, cb) => {
        if (file.mimetype.startsWith("image")) {
                cb(null, true); 
        } else {
                cb(new Error("Only image files are allowed!"), false);
        }
};

const upload = multer({ storage: diskStorage, fileFilter: fileFilter });

router.route("/")
    .get(verifyToken,allowedTo(userRoles.ADMIN , userRoles.INSTRUCTOR), userControllers.getAllUsers)

router.route("/:usersId")
        .delete(verifyToken,allowedTo(userRoles.ADMIN), userControllers.deleteUser)


router.route("/register")
        .post(upload.single("avatar"), userControllers.registerUser);
            
router.route("/login")
         .post(userControllers.loginUser);
        


module.exports = router;
