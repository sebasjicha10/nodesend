const User = require("../models/User")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const {validationResult} = require("express-validator")
require("dotenv").config({path: "variables.env"})


exports.authenticateUser = async (req, res, next) => {

    // Express Validator errors
    const errors = validationResult(req)
    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()})
    }

    // Check if user is registered
    const {email, password} = req.body
    const user = await User.findOne({email})
    
    if(!user) {
        res.status(401).json({msg: "That user doesn't exist"})
        return next()
    }

    // Check password and authenticate user
    if(bcrypt.compareSync(password, user.password)) {
        // Create JWT
        const token = jwt.sign({
            id: user._id,
            name: user.name,
            email: user.email
        }, process.env.SECRET, {
            expiresIn: "8h"
        })

        res.json({token})

    } else {
        res.status(401).json({msg: "Wrong Password"})
        return next()
    }
}

exports.authenticatedUser = async (req, res, next) => {
    res.json({user: req.user})
}