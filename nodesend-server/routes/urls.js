const express = require("express")
const router = express.Router()
const urlsController = require("../controllers/urlsController")
const filesController = require("../controllers/filesController")
const {check} = require("express-validator")
const auth = require("../middleware/auth")


router.post("/",
    [
        check("name", "Upload a file").not().isEmpty(),
        check("original_name", "Upload a file").not().isEmpty(),
    ],
    auth,
    urlsController.newURL
)

router.get("/", 
    urlsController.allUrls
)


router.get("/:url",
    urlsController.hasPassword,
    urlsController.getUrl
)

router.post("/:url",
    urlsController.verifyPassword,
    urlsController.getUrl
)

module.exports = router