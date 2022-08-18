require('dotenv').config()
const jwt = require('jsonwebtoken')


const auth = async (req, res, next) => {
    let token = null
    const authHeader = req.headers.authorization
    if (authHeader) {
        token = authHeader.split(' ')[1]
    } else {
        console.log('Unauthorized')
        return res.status(400).json({
            message: "No token found"
        })
    }

    try {
        let admin = jwt.verify(token, process.env.TOKEN_KEY)

        const _ = Date.now().toString()
        const now = parseInt(_.substring(0, _.length - 3))
        const expired = admin.exp

        if (now > expired) {
            console.log('Unauthorized')
            return res.status(400).json({
                message: "Token expired"
            })
        } else {
            req.admin = admin
            next()
        }
    } catch (error) {
        console.log('Unauthorized')
        return res.status(400).json({
            message: error.message
        })
    }


}

module.exports = auth