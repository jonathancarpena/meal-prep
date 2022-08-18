import pkg from "mongoose"
import moment from "moment"
const { Schema, ObjectId, model } = pkg

// Example {
//     date_placed: moment(Date.now()),
//     book_date: moment(Date.now()).add(1, 'week'),
//     items: [
//         { _id: 1, qty: 2 },
//         { _id: 2, qty: 3 }
//     ],
//     customer: {
//         first_name: 'Maddy',
//         last_name: 'Bea',
//         email: 'meggymegs@email.com'
//     },
//     completed: false,
// },

const OrderItemSchema = new Schema({
    _id: {
        type: ObjectId,
        required: true,
    },
    qty: {
        type: Number,
        required: true,
    }
})
const CustomerSchema = new Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    }
})
const orderSchema = new Schema({
    date_placed: {
        type: Date,
        required: false,
        default: moment(Date.now()).toDate()
    },
    book_date: {
        type: Date,
        required: true,
    },
    items: {
        type: [OrderItemSchema],
        required: true
    },
    customer: {
        type: CustomerSchema,
        required: true
    },
    completed: {
        type: Boolean,
        required: false,
        default: false
    },
    number: {
        type: Number,
        required: true
    }
})

const Order = model('order', orderSchema)
export default Order