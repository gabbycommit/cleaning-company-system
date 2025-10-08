import express from "express";
import { createOrder, getCustomerOrders } from "../controllers/orderController.js";

const router = express.Router();

// 下单
router.post("/", createOrder);

// 查看客户订单
router.get("/customer/:customer_id", getCustomerOrders);

export default router;
