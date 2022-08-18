const express = require('express')
const router = express.Router();
const {
    post_Login,
    put_UpdateProfile
} = require('../controller/adminController.js');

const auth = require('../middleware/auth.js')

//@desc     POST log admin in
//@route    POST /api/admin/login
///@access  Admin
router.post("/login", post_Login)


//@desc     PUT update profile info
//@route    PUT /api/admin/update
///@access  Admin
router.put("/update", auth, put_UpdateProfile)


module.exports = router
