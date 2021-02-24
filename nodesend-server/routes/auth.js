const express = require("express")
const router = express.Router()
const authController = require("../controllers/authController")
const {check} = require("express-validator")
const auth = require("../middleware/auth")


router.post("/",
    [
        check("email", "Add a Valid Email").isEmail(),
        check("password", "The Password is mandatory").not().isEmpty()
    ],
    authController.authenticateUser
)

router.get("/", 
    auth,
    authController.authenticatedUser
)

module.exports = router