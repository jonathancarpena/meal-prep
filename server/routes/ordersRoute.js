const express = require('express')
const {
    get_AllOrders,
    get_SingleOrder,
    post_AddOrder,
    delete_RemoveOrder,
    put_updateOrder,
} = require("../controller/ordersController.js")
const auth = require("../middleware/auth.js");


const router = express.Router();

//@desc     POST add order
//@route    POST /api/orders/add
///@access  Public
router.post("/add", post_AddOrder)

//@desc     GET single order by id
//@route    GET /api/orders/:_id
///@access  Public
router.get("/:_id", get_SingleOrder)

//@desc     GET all orders
//@route    GET /api/orders
///@access  Admin
router.get("/", auth, get_AllOrders)

//@desc     DELETE remove order
//@route    DELETE /api/orders?id=:_id
///@access  Admin
router.delete("/:_id", auth, delete_RemoveOrder)

//@desc     PUT update order
//@route    PUT /api/orders?id=:_id
///@access  Admin
router.put("/:_id", auth, put_updateOrder)


module.exports = router;