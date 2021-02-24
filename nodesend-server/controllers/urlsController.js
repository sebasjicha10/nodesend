const Url = require("../models/Url")
const shortid = require("shortid")
const bcrypt = require("bcrypt")
const {validationResult} = require("express-validator")
const { json } = require("express")


exports.newURL = async (req, res, next) => {

    // Check for erros
    const errors = validationResult(req)
    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()})
    }

    // Create Url Object
    const {original_name, name} = req.body

    const url = new Url()
    url.url = shortid.generate()
    url.name = name
    url.original_name = original_name
    
    // Authenticated user
    if(req.user) {
        const {password, downloads} = req.body

        if(downloads) {
            url.downloads = downloads
        }
        if(password) {
            const salt = await bcrypt.genSalt(10)
            url.password = await bcrypt.hash(password, salt)
        }

        // Asign the author
        url.author = req.user.id
    }

    try {
        await url.save()
        res.json({msg: `${url.url}`})
        return next() 
    } catch (error) {
        console.log(error)
    }
}

exports.hasPassword = async (req, res, next) => {
    const {url} = req.params

    // Check for the url
    const link = await Url.findOne({url})

    if(!link) {
        res.status(404).json({msg: "The URL doesn't exist"})
        return next()
    }
    
    if(link.password) {
        return res.json({
            password: true, 
            url: url
        })
    }

    next()
}

// Gets a list of all urls
exports.allUrls = async (req, res) => {
    try {
        const urls = await Url.find({}).select("url -_id")
        res.json({urls})
    } catch (error) {
        console.log(error)
    }
}

exports.verifyPassword = async (req, res, next) => {

    const {url} = req.params
   
    const {password} = req.body

    const link = await Url.findOne({url})
  
    if(bcrypt.compareSync(password, link.password)) {
        next()
    } else {
        return res.status(401).json({msg: "Incorrect Password"})
    }

}

exports.getUrl = async (req, res, next) => {

    const {url} = req.params

    // Check for the url
    const link = await Url.findOne({url})

    if(!link) {
        res.status(404).json({msg: "The URL doesn't exist"})
        return next()
    }
    
    res.json({file: link.name, password: false})

    next()
}