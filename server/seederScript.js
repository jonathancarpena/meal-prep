require('dotenv').config()

// Models
const Admin = require('./models/Admin.js')
const Availability = require('./models/Availability.js')
const Meal = require('./models/Meal.js')
const Order = require('./models/Order.js')

// Sample Data
const adminData = require('./data/sample/admin.js')
const availabilityData = require('./data/sample/availability.js')
const mealData = require('./data/sample/meals.js')
const orderData = require('./data/sample/orders.js')

// Utils
const { generateHashPassword } = require('./lib/utils.js')

// MongoDB Connect
const connectDB = require('./config/db.js')



connectDB()


async function createAdmin() {
    let updatedInfo = { ...adminData }
    updatedInfo.password = await generateHashPassword(updatedInfo.password)
    return updatedInfo
}

async function createOrders() {
    function getRandomInt(min, max) {
        return Math.floor(Math.random() * max) + min;
    }
    const meals = await Meal.find()
    let updatedOrders = []
    for (const order of orderData) {
        let orderWithItems = { ...order }
        const index = orderData.findIndex(item => item === order)
        const randomAmountOfItems = getRandomInt(1, 3)
        for (let i = 0; i <= randomAmountOfItems; i++) {
            const randomQty = getRandomInt(1, 3)
            const randomMeal = getRandomInt(0, meals.length - 1)

            orderWithItems.items.push({
                _id: meals[randomMeal]._id,
                qty: randomQty
            })
        }
        orderWithItems.number = index
        updatedOrders.push(orderWithItems)
    }

    return updatedOrders
}

// Deletes Everything in Database
// Inputs default Data
const importData = async () => {

    try {
        // Deletes Everything
        console.log('CLEARING DB')
        await Admin.deleteMany({})
        await Availability.deleteMany({})
        await Meal.deleteMany({})
        await Order.deleteMany({})

        // Inserts default data
        console.log("CREATING ADMIN")
        const admin = await createAdmin()
        await Admin.insertMany([admin])

        console.log('INPUTTING AVAILABILITY')
        await Availability.insertMany([...availabilityData])

        console.log("INPUTTING MEALS")
        await Meal.insertMany([...mealData])

        console.log("INPUTTING ORDERS")
        const orders = await createOrders()
        await Order.insertMany([...orders])

        console.log('Data Import Success')
        process.exit()
    } catch (error) {
        console.error("Error with data import", error)
        process.exit(1)
    }
}


importData()


