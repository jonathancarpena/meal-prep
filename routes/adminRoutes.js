import { Router } from "express";
const router = Router();
import {
    post_Login,
    put_UpdateProfile
} from '../controller/adminController.js';
import auth from '../middleware/auth.js'

//@desc     POST log admin in
//@route    POST /api/admin/login
///@access  Admin
router.post("/login", post_Login)


//@desc     PUT update profile info
//@route    PUT /api/admin/update
///@access  Admin
router.put("/update", auth, put_UpdateProfile)



export default router;