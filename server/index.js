require('dotenv').config

// Express
const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')

// Database
const connectDB = require('./config/db.js')

// Routes
const adminRoutes = require('./routes/adminRoutes.js')
const availabilityRoutes = require('./routes/availabilityRoutes.js')
const mealRoutes = require('./routes/mealsRoute.js')
const orderRoutes = require('./routes/ordersRoute.js')
const imageRoutes = require('./routes/imageRoute.js')

// Conncet to MongoDB
connectDB();

// Express Server
const app = express()

// app.use(cors({
//     credentials: true,
//     origin: "http://localhost:3000"
// }))
app.use(cors())

// For JSON Data
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({
    extended: false
}))



// Routes: (extension, routes)
app.use("/api/admin", adminRoutes)
app.use("/api/availability", availabilityRoutes)
app.use("/api/meals", mealRoutes)
app.use("/api/orders", orderRoutes)
app.use('/image', imageRoutes)


// Uncomment For Development
// if (process.env.NODE_ENV === "production") {
//     app.use(express.static(path.join(__dirname.split("server")[0], "client", "build")))
//     app.get("*", (req, res) => {
//         res.sendFile(path.join(__dirname.split("server")[0], "client", "build", "index.html"))
//     })
// }



// Port server is running on
app.listen(process.env.PORT || 5000, () => console.log(`Server running on port ${process.env.PORT || 5000}`)
)