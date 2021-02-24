const User = require("../models/User")
const bcrypt = require("bcrypt")
const {validationResult} = require("express-validator")


exports.newUser = async (req, res) => {

    // Express Validator errors
    const errors = validationResult(req)

    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()})
    }

    // User Validation
    const {email, password} = req.body

    let user = await User.findOne({email})

    if(user) {
        return res.status(400).json({msg: "User already registered"})
    }

    // New User addition
    user = new User(req.body)
    
    // Password hash
    const salt = await bcrypt.genSalt(10)
    user.password = await bcrypt.hash(password, salt)

    try {
        await user.save()
    } catch (error) {
        console.log(error)
    }
    
    res.json({msg: "User Created Successfully"})
}