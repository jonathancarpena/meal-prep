require('dotenv').config()
const mongoose = require('mongoose')

async function connectDB() {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log('MongoDB connection Success')
    } catch (error) {
        console.error("MongoDB connection Fail")
        process.exit(1)
    }
}

module.exports = connectDB;