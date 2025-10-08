import db from "../config/db.js";

// 客户下单
export const createOrder = (req, res) => {
    const { customer_id, service, schedule } = req.body;

    const query = "INSERT INTO orders (customer_id, service, schedule) VALUES (?, ?, ?)";
    db.query(query, [customer_id, service, schedule], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });

        res.json({ message: "下单成功", orderId: results.insertId });
    });
};

// 客户查看自己的订单
export const getCustomerOrders = (req, res) => {
    const { customer_id } = req.params;

    const query = "SELECT * FROM orders WHERE customer_id = ?";
    db.query(query, [customer_id], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });

        res.json(results);
    });
};

// 员工查看自己被分配的订单
export const getEmployeeOrders = (req, res) => {
    const { employee_id } = req.params;

    const query = "SELECT * FROM orders WHERE assigned_employee_id = ? AND status IN ('assigned','in-progress')";
    db.query(query, [employee_id], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });

        res.json(results);
    });
};

// 员工开始订单（拍照 + status 变 in-progress）
export const startOrder = (req, res) => {
    const { order_id, photo_before } = req.body;

    const query = "UPDATE orders SET status='in-progress', start_time=NOW(), photo_before=? WHERE id=?";
    db.query(query, [photo_before, order_id], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });

        res.json({ message: "订单开始" });
    });
};

// 员工完成订单（拍照 + status 变 completed）
export const completeOrder = (req, res) => {
    const { order_id, photo_after } = req.body;

    const query = "UPDATE orders SET status='completed', end_time=NOW(), photo_after=? WHERE id=?";
    db.query(query, [photo_after, order_id], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });

        res.json({ message: "订单完成" });
    });
};
