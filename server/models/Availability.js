const mongoose = require('mongoose')


// Example [
//     "Wed May 10 2022 00:00:00 GMT-0700 (Pacific Daylight Time)",
//     "Fri May 20 2022 00:00:00 GMT-0700 (Pacific Daylight Time)",
//     "Wed May 13 2022 00:00:00 GMT-0700 (Pacific Daylight Time)",
//     "Fri May 14 2022 00:00:00 GMT-0700 (Pacific Daylight Time)",
// ]

const availabilitySchema = new mongoose.Schema({
    day: {
        type: Date,
        required: false,
    },

})

const Avaibility = mongoose.model('avaibility', availabilitySchema)


module.exports = Avaibility