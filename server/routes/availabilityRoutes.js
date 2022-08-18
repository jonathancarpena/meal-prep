const express = require('express')
const {
    get_AllDates,
    post_AddDate,
    delete_removeDate,
} = require("../controller/availabilityController.js")
const auth = require("../middleware/auth.js")


const router = express.Router();

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


module.exports = router;