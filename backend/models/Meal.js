import pkg from "mongoose"
import moment from "moment"
const { Schema, ObjectId, model } = pkg

// Example {
//     _id: 1,
//     active: false,
//     type: 'breakfast',
//     img: null,
//     name: 'Super French Toast',
//     price: 5,
//     info: {
//         calories: 500,
//         protein: 26,
//         carbs: 10,
//         fats: 5,
//         ingredients: ['eggs', 'milk', 'flour'],
//         description: 'Classic Anabolic Meal that is high on protein low in calories'
//     }
// }

const NutritionSchema = new Schema({
    calories: {
        type: Number,
        required: false,
        default: 500
    },
    protein: {
        type: Number,
        required: false,
        default: 20
    },
    carbs: {
        type: Number,
        required: false,
        default: 20
    },
    fats: {
        type: Number,
        required: true,
        default: 20
    },

})
const mealSchema = new Schema({
    active: {
        type: Boolean,
        required: false,
        default: false,
    },
    type: {
        type: String,
        required: false,
        default: 'lunch'
    },
    img: {
        type: String,
        required: false,
        default: null
    },
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: false,
        default: 8
    },
    description: {
        type: String,
        required: false,
        default: '',
    },
    ingredients: {
        type: [String],
        required: false,
        default: ['']
    },
    nutrition: {
        type: NutritionSchema,
        required: true,
        default: {
            calories: 500,
            protein: 50,
            carbs: 50,
            fats: 50,
        }
    }

})

const Meal = model('meal', mealSchema)
export default Meal