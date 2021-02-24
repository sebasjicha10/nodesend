const multer = require("multer")
const shortid = require("shortid")
const fs = require("fs")
const Url = require("../models/Url")


exports.uploadFile = async (req, res, next) => {

    const multerConfig = {
        limits: {fileSize: req.user ? 1024 * 1024 * 10 : 1024 * 1024},
        storage: fileStorage = multer.diskStorage({
            destination: (req, file, cb) => {
                cb(null, __dirname + "/../uploads")
            },
            filename: (req, file, cb) => {
                const extension = file.originalname.substring(file.originalname.lastIndexOf("."), file.originalname.length)
                cb(null, `${shortid.generate()}${extension}`)
            },
            
        })
    }
    
    const upload =multer(multerConfig).single("file")

    upload(req, res, async (error) => {
        console.log(req.file)

        if(!error) {
            res.json({file: req.file.filename})
        } else {
            console.log(error)
            return next()
        }
    })
    
}

exports.deleteFile = async (req, res) => {
    
   try {
       fs.unlinkSync(__dirname + `/../uploads/${req.file}`)
       console.log("FILE DELETED")
   } catch (error) {
       console.log(error)
   }

}

exports.download = async (req, res, next) => {

    const {file} = req.params
    const url = await Url.findOne({name: file})

    const fileDownload = __dirname + "/../uploads/" + file
    res.download(fileDownload)

    // Handle downloads left
    const {downloads, name} = url

    if(downloads === 1) {
        
        // Delete file
        req.file = name

        // Delete URL from DB
        await Url.findOneAndRemove(url.id)
        next()

    } else {
        url.downloads--
        await url.save()
    }
}

