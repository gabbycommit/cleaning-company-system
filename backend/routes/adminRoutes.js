import express from "express";
import { 
    assignEmployee, 
    getAllOrders, 
    getPendingOrders, 
    getMonthlyStats,
    createEmployee
} from "../controllers/adminController.js";

const router = express.Router();

// 分配员工给订单
router.post("/assign", assignEmployee);

// 查看所有订单
router.get("/orders", getAllOrders);

// 查看未完成订单
router.get("/orders/pending", getPendingOrders);

// 月度订单统计
router.get("/orders/stats", getMonthlyStats);

// 创建员工
router.post("/create-employee", createEmployee);

export default router;
