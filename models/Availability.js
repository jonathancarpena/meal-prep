import pkg from "mongoose"
import moment from "moment"
const { Schema, ObjectId, model } = pkg

// Example [
//     "Wed May 10 2022 00:00:00 GMT-0700 (Pacific Daylight Time)",
//     "Fri May 20 2022 00:00:00 GMT-0700 (Pacific Daylight Time)",
//     "Wed May 13 2022 00:00:00 GMT-0700 (Pacific Daylight Time)",
//     "Fri May 14 2022 00:00:00 GMT-0700 (Pacific Daylight Time)",
// ]

const availabilitySchema = new Schema({
    day: {
        type: Date,
        required: false,
    },

})

const Avaibility = model('avaibility', availabilitySchema)
export default Avaibility