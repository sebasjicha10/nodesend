const express = require("express")
const router = express.Router()
const userController = require("../controllers/userController")
const {check} = require("express-validator")


router.post("/", 
    [
        check("name", "The name is mandatory").not().isEmpty(),
        check("email", "A valid email is mandatory").isEmail(),
        check("password", "A at least 6 characters password is mandatory").isLength({min: 6})
    ],
    userController.newUser
)

module.exports = router