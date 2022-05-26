import Orders from '../models/Order.js'
import moment from 'moment'

// post_AddOrder,
// get_AllOrders,
// get_SingleOrder,
// delete_RemoveOrder,
// put_updateOrder,

// Public Access
export const post_AddOrder = async (req, res) => {
    console.log('POST: Add Order')

    try {
        let newBody = {
            ...req.body
        }
        newBody["book_date"] = moment(req.body.book_date).toDate()

        const orders = await Orders.find()
        const newOrder = await Orders.create({ ...newBody, number: orders.length })
        return res.status(200).json(newOrder)
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            message: "Server Error"
        })
    }
}

// Admin Access
export const get_AllOrders = async (req, res) => {
    console.log('GET: All Orders')
    try {
        const allOrders = await Orders.find()
        return res.status(200).json(allOrders)
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            message: "Server Error"
        })
    }
}

// Admin Access
export const get_SingleOrder = async (req, res) => {
    console.log('GET: Single Order')
    const { _id } = req.params
    try {
        const singleOrder = await Orders.findById(_id)
        return res.status(200).json(singleOrder)
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            message: "Server Error"
        })
    }
}


// Admin Access
export const delete_RemoveOrder = async (req, res) => {
    console.log('DELETE: Delete Order')
    const { _id } = req.params
    try {
        await Orders.findByIdAndDelete(_id)
        return res.status(200).json({
            message: "Successfully deleted.",
        })
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            message: "Server Error"
        })
    }
}

// Admin Access
export const put_updateOrder = async (req, res) => {
    console.log('PUT: Update Order')
    const { _id } = req.params
    try {
        const updatedOrder = await Orders.findByIdAndUpdate(_id, { ...req.body })
        return res.status(200).json(updatedOrder)
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            message: "Server Error"
        })
    }
}









