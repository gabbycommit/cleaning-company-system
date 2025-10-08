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
