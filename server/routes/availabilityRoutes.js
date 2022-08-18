import { Router } from "express";
import {
    get_AllDates,
    post_AddDate,
    delete_removeDate,
} from "../controller/availabilityController.js";
import auth from "../middleware/auth.js";


const router = Router();

//@desc     GET all available dates
//@route    GET /api/availability
///@access  Admin
router.get("/", get_AllDates)

//@desc     POST add new available dates
//@route    POST /api/availability/add
///@access  Admin
router.post("/add", auth, post_AddDate)

//@desc     DELETE remove date
//@route    DELETE /api/availability/remove/:day
///@access  Admin
router.delete("/remove/:day", auth, delete_removeDate)


export default router;