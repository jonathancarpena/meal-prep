const mongoose = require('mongoose')
// Example {
//     email: 'misterjack@email.com',
//     phone: 1234567890,
//     password: 'test123',
// }

const adminSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        lowercase: true,
        trim: true
    },
    phone: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
})

const Admin = mongoose.model('admin', adminSchema)
module.exports = Admin