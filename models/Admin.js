import pkg from "mongoose"
import moment from "moment"
const { Schema, ObjectId, model } = pkg

// Example {
//     email: 'misterjack@email.com',
//     phone: 1234567890,
//     password: 'test123',
// }

const adminSchema = new Schema({
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

const Admin = model('admin', adminSchema)
export default Admin