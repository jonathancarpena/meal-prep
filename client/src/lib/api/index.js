import axios from 'axios'
import sampleAuth from '../db/sampleAuth'
import sampleOrders from '../db/sampleOrders'
import sampleMeals from "../db/sampleMeals";
import sampleBlockedDates from '../db/sampleBlockedDates'

// Uncomment for Development
// const BASE_API = 'http://localhost:5000/api'


const BASE_API = 'https://nathan-meal-prep.herokuapp.com/api'

export const today = sampleMeals.filter((item) => item.active === true)

export function mealById(_id) {
    return sampleMeals.find((item) => item._id.toString() === _id.toString())
}

export function orderById(order_id) {
    return sampleOrders.find((item) => item.order_id.toString() === order_id.toString())
}
export const meals = sampleMeals

export const blockedDates = sampleBlockedDates

export async function checkAuth(data) {
    let res = {
        ok: true,
        status: 400,
        data: null,
        token: null
    }

    if (!data.email) {
        if (data.phone !== sampleAuth.phone) {
            res.ok = false
            res.status = 400
            res.data = {
                message: "Invalid Credentials"
            }
        }
    }

    if (!data.phone) {
        if (data.email !== sampleAuth.email) {
            res.ok = false
            res.status = 400
            res.data = {
                message: "Invalid Credentials"
            }
        }
    }
    if (data.password !== sampleAuth.password) {
        res.ok = false
        res.status = 400
        res.data = {
            message: "Invalid Credentials"
        }

    }

    if (res.ok) {
        res.ok = true
        res.status = 200
        res.data = {
            message: "Success"
        }
        res.token = "12345"
    }

    return res
}

export const orders = sampleOrders


// MEALS //
export async function get_AllMeals() {
    const res = await axios.get(`${BASE_API}/meals`)
    return res.data
}

export async function get_TodaysMeals() {
    const res = await axios.get(`${BASE_API}/meals/today`)
    return res.data
}

export async function get_SingleMeal(_id) {
    const res = await axios.get(`${BASE_API}/meals/${_id}`)
    return res.data
}

export async function get_SimilarMeals(filter) {
    const res = await axios.get(`${BASE_API}/meals/similar/${filter}`)
    return res.data
}

export async function post_AddMeal(token, body) {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
        }
    }
    const res = await axios.post(`${BASE_API}/meals/add`, body, config)
    return res.data
}

export async function delete_RemoveMeal(token, id) {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
        }
    }
    const res = await axios.delete(`${BASE_API}/meals/${id}`, config)
    return res.data
}

export async function put_UpdateMeal(token, id, body) {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
        }
    }
    const res = await axios.put(`${BASE_API}/meals/${id}`, body, config)
    return res.data

}



// ORDERS //
export async function get_AllOrders(token) {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
        }
    }
    const res = await axios.get(`${BASE_API}/orders`, config)
    return res.data
}

export async function get_SingleOrder(token, id) {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
        }
    }
    const res = await axios.get(`${BASE_API}/orders/${id}`, config)
    return res.data
}

export async function post_AddOrder(body) {
    // const config = {
    //     headers: {
    //         Authorization: `Bearer ${token}`,
    //         "Content-Type": "application/json"
    //     }
    // }
    const res = await axios.post(`${BASE_API}/orders/add`, body)
    return res.data
}

export async function delete_RemoveOrder(token, id) {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
        }
    }
    const res = await axios.delete(`${BASE_API}/orders/${id}`, config)
    return res.data
}

export async function put_UpdateOrder(token, id, body) {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
        }
    }
    const res = await axios.put(`${BASE_API}/orders/${id}`, body, config)
    return res.data
}

// AVAILABILITY //
export async function get_AllDates() {
    const res = await axios.get(`${BASE_API}/availability`)
    return res.data
}

export async function post_AddDate(token, body) {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
        }
    }
    const res = await axios.post(`${BASE_API}/availability/add`, body, config)
    return res.data
}

export async function delete_RemoveDate(token, day) {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
        }
    }

    const res = await axios.delete(`${BASE_API}/availability/remove/${day}`, config)
    return res.data
}


// ADMIN //
export async function post_Login(body) {
    const res = await axios.post(`${BASE_API}/admin/login`, body)
    return res.data
}

export async function put_UpdateProfile(token, body) {

    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
        }
    }
    try {
        const res = await axios.put(`${BASE_API}/admin/update`, body, config)
        return res.data
    } catch (error) {
        return null
    }

}

