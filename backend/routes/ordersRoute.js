import { Router } from "express";
import {
    get_AllOrders,
    get_SingleOrder,
    post_AddOrder,
    delete_RemoveOrder,
    put_updateOrder,
} from "../controller/ordersController.js";
import auth from "../middleware/auth.js";


const router = Router();

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
router.get("/", get_AllOrders)

//@desc     DELETE remove order
//@route    DELETE /api/orders?id=:_id
///@access  Admin
router.delete("/:_id", delete_RemoveOrder)

//@desc     PUT update order
//@route    PUT /api/orders?id=:_id
///@access  Admin
router.put("/:_id", put_updateOrder)


export default router;