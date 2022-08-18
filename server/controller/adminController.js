require('dotenv').config()
const Admin = require('../models/Admin.js')

// Auth
const jwt = require('jsonwebtoken')
const bcrypt = 'bcrypt'
const { generateHashPassword } = require('../lib/utils.js')
const moment = require('moment')



// post_Login,
// put_UpdateProfile

// Admin Access
const post_Login = async (req, res) => {
    console.log('POST: Login Event')
    try {
        // Get user input
        const { email, phone, password } = req.body

        // Validate user input
        if (!email && !phone) {
            return res.status(400).json({
                message: "All input is required"
            })
        }

        if (!password) {
            return res.status(400).json({
                message: "All input is required"
            })
        }

        if ((email || phone) && password) {
            let admin;

            if (email) {
                admin = await Admin.findOne({ email: email })
            } else {
                admin = await Admin.findOne({ phone: phone })
            }

            if (!admin) {
                return res.status(401).json({
                    message: "Invalid Credentials"
                })
            }

            const isMatch = await bcrypt.compare(password, admin.password)
            if (!isMatch) {
                return res.status(401).json({
                    message: "Invalid Credentials"
                })
            }

            if (isMatch && admin) {
                const token = jwt.sign({
                    _id: admin._id,
                    email: admin.email
                }, process.env.TOKEN_KEY, {
                    expiresIn: 9000000
                })

                const expires = moment(Date.now()).add(9000000, 'milliseconds')._d

                return res.status(200).json({ token, expires })
            }
        }

    } catch (error) {
        console.error(error)
        return res.status(500).json({
            message: "Server Error"
        })
    }
}

// Admin Access
const put_UpdateProfile = async (req, res) => {

    const { _id } = req.admin
    const { oldPassword, password, oldEmail, email, oldPhone, phone, condition } = req.body
    console.log(`PUT: Update Profile ${condition}`)

    try {
        const admin = await Admin.findById(_id)

        if (condition === "password") {
            if (!oldPassword || !password) {
                return res.status(401).json({
                    message: "Input Required"
                })
            }
            const isMatch = await bcrypt.compare(oldPassword, admin.password)
            if (isMatch) {
                const newPassword = await generateHashPassword(password)
                const updatedAdmin = await Admin.findByIdAndUpdate(_id, { password: newPassword })
                console.log('Update: Admin Password')
                return res.status(200).json(updatedAdmin)
            } else {
                return res.status(401).json({
                    message: "Invalid Credentials"
                })
            }
        } else if (condition === "email") {
            if (!oldEmail || !email) {
                return res.status(401).json({
                    message: "Input Required"
                })
            }


            if (admin.email.toLowerCase() === oldEmail.toLowerCase()) {
                const updatedAdmin = await Admin.findByIdAndUpdate(_id, { email: email })
                console.log('Update: Admin Email')
                return res.status(200).json(updatedAdmin)
            } else {
                return res.status(401).json({
                    message: "Invalid Credentials"
                })
            }
        } else if (condition === "phone") {
            if (!oldPhone || !phone) {
                return res.status(401).json({
                    message: "Input Required"
                })
            }

            if (admin.phone === oldPhone) {
                console.log('Update: Admin Phone Number')
                const updatedAdmin = await Admin.findByIdAndUpdate(_id, { phone: phone })
                return res.status(200).json(updatedAdmin)
            } else {
                return res.status(401).json({
                    message: "Invalid Credentials"
                })
            }
        }

        return res.status(200).json(admin)
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            message: "Server Error"
        })
    }
}

module.exports = {
    post_Login, put_UpdateProfile
}