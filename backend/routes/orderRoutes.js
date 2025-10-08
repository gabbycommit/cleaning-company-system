import express from "express";
import {
  createOrder,
  getCustomerOrders,
  getEmployeeOrders,
  startOrder,
  completeOrder
} from "../controllers/orderController.js";

const router = express.Router();

// 下单
router.post("/", createOrder);

// 查看客户订单
router.get("/customer/:customer_id", getCustomerOrders);

// 查看员工分配的订单
router.get("/employee/:employee_id", getEmployeeOrders);

// 员工开始订单
router.post("/start", startOrder);

// 员工完成订单
router.post("/complete", completeOrder);

export default router;
