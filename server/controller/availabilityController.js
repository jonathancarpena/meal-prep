import Availability from '../models/Availability.js'
import moment from 'moment'

// get_AllDates,
// post_AddDate,
// put_updateAvailability,

// Admin Access
export const get_AllDates = async (req, res) => {
    console.log('GET: All Date')

    try {
        const allDates = await Availability.find()
        const today = moment(Date.now())

        const updatedDates = []
        for (const date of allDates) {
            const _ = moment(date.day)
            if (moment(date.day).isBefore(today)) {
                await Availability.findByIdAndDelete(date._id)
            } else {
                updatedDates.push(date)
            }

        }
        return res.status(200).json(updatedDates)
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            message: "Server Error"
        })
    }
}

// Admin Access
export const post_AddDate = async (req, res) => {
    console.log('POST: Add Date')
    console.log(req.body)
    try {
        const _ = await Availability.create({ ...req.body })
        const allDates = await Availability.find()
        console.log(allDates)
        return res.status(200).json(allDates)
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            message: "Server Error"
        })
    }
}


// Admin Access
export const delete_removeDate = async (req, res) => {
    console.log('DELETE: Remove Date')
    const { day } = req.params

    try {
        const allDates = await Availability.find()
        let _id;
        for (const date of allDates) {
            if (moment(date.day).format('YYYY-MM-DD') === moment(day).format('YYYY-MM-DD')) {
                _id = date._id
            }
        }

        await Availability.findByIdAndDelete(_id)
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

