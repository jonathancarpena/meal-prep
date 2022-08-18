import { Router } from "express";
import {
    get_Image,

} from "../controller/imageController.js";



const router = Router();

//@desc     GET image
//@route    GET /api/image/:imgName
///@access  Public
router.get("/:imgName", get_Image)


export default router;