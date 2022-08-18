const express = require('express')
const get_Image = require("../controller/imageController.js")



const router = express.Router();

//@desc     GET image
//@route    GET /api/image/:imgName
///@access  Public
router.get("/:imgName", get_Image)


module.exports = router;