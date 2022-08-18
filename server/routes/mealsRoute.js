const express = require('express')
const {
    get_AllMeals,
    get_TodaysMeals,
    get_SingleMeal,
    get_SimilarMeals,
    post_AddMeal,
    delete_RemoveMeal,
    put_updateMeal,
} = require("../controller/mealsController.js")
const auth = require("../middleware/auth.js")
const { resizeImg, upload } = require('../middleware/upload.js')

const router = express.Router();

//@desc     GET all meals
//@route    GET /api/meals
///@access  Public
router.get("/", get_AllMeals)

//@desc     GET todays meals
//@route    GET /api/meals/today
///@access  Public
router.get("/today", get_TodaysMeals)

//@desc     GET single meal by id
//@route    GET /api/meals/:_id
///@access  Public
router.get("/:_id", get_SingleMeal)


//@desc     GET similar meals by filter
//@route    GET /api/meals/similar/:filter
///@access  Public
router.get("/similar/:filter", get_SimilarMeals)

//@desc     POST add meal
//@route    POST /api/meals/add
///@access  Admin
router.post(
    "/add",
    auth,
    post_AddMeal
)

//@desc     DELETE remove meal
//@route    DELETE /api/meals/:_id
///@access  Admin
router.delete("/:_id", auth, delete_RemoveMeal)

//@desc     PUT remove meal
//@route    PUT /api/meals/:_id
///@access  Admin
router.put(
    "/:_id",
    auth,
    upload.single('image'),
    resizeImg,
    put_updateMeal
)


module.exports = router