const Meals = require('../models/Meal.js')
const fs = require('fs')

const imageFolder = `${__dirname.split('controller')[0]}\\data\\images`
// get_AllMeals,
// get_TodaysMeals,
// get_SingleMeal,
// post_AddMeal,
// delete_RemoveMeal,
// put_updateMeal,

// Public Access
const get_AllMeals = async (req, res) => {
    console.log('GET: All Meals')

    try {
        const meals = await Meals.find()
        return res.status(200).json(meals)
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            message: "Server Error"
        })
    }
}

const get_TodaysMeals = async (req, res) => {
    console.log('GET: Todays Meals')

    try {
        const _ = await Meals.find()
        const today = _.filter((item) => item.active)
        return res.status(200).json(today)
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            message: "Server Error"
        })
    }
}

// Public Access
const get_SingleMeal = async (req, res) => {
    console.log('GET: Single Meal')
    const { _id } = req.params

    try {
        const singleMeal = await Meals.findById(_id)
        return res.status(200).json(singleMeal)
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            message: "Server Error"
        })
    }
}
// Public Access
const get_SimilarMeals = async (req, res) => {
    console.log('GET: Similar Meals')
    const { filter } = req.params

    try {
        const allMeals = await Meals.find()
        const filteredMeals = allMeals.filter((item) => item.type !== filter)
        return res.status(200).json(filteredMeals)
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            message: "Server Error"
        })
    }
}


// Admin Access
const post_AddMeal = async (req, res) => {
    console.log('POST: Add Meal')

    try {
        const newMeal = await Meals.create({ ...req.body })
        return res.status(200).json(newMeal)
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            message: "Server Error"
        })
    }
}

// Admin Access
const delete_RemoveMeal = async (req, res) => {
    console.log('DELETE: Delete Meal')
    const { _id } = req.params

    try {
        const meal = await Meals.findById(_id)
        if (meal.img) {
            fs.access(`${imageFolder}/${meal.img}`, (err) => {
                if (err) {
                    return
                } else {
                    fs.unlinkSync(`${imageFolder}/${meal.img}`)
                }
            })
        }
        await Meals.findByIdAndDelete(_id)
        return res.status(200).json({
            message: 'Successfully Deleted.'
        })
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            message: "Server Error"
        })
    }
}

// Admin Access
const put_updateMeal = async (req, res) => {
    console.log('PUT: Update Meal')
    const { _id } = req.params
    let body = { ...req.body }

    if (req.file !== undefined && req.file.filename) {
        const oldMeal = await Meals.findById(_id)
        if (oldMeal.img) {
            fs.access(`${imageFolder}/${oldMeal.img}`, (err) => {
                if (err) {
                    return
                } else {
                    fs.unlinkSync(`${imageFolder}/${oldMeal.img}`)
                }
            })
        }

        body = { img: req.file.filename }
    }
    try {
        const updatedMeal = await Meals.findByIdAndUpdate(_id, { ...body })
        return res.status(200).json(updatedMeal)
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            message: "Server Error"
        })
    }
}

module.exports = {
    get_AllMeals,
    get_TodaysMeals,
    get_SingleMeal,
    get_SimilarMeals,
    post_AddMeal,
    delete_RemoveMeal,
    put_updateMeal
}









