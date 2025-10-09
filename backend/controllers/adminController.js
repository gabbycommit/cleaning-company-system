import db from "../config/db.js";
import bcrypt from "bcryptjs";

// 管理员分配员工给订单
export const assignEmployee = (req, res) => {
    const { order_id, employee_id } = req.body;

    const query = "UPDATE orders SET assigned_employee_id = ?, status='assigned' WHERE id = ?";
    db.query(query, [employee_id, order_id], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });

        res.json({ message: `订单 ${order_id} 已分配给员工 ${employee_id}` });
    });
};

// 查看所有订单（管理员追踪）
export const getAllOrders = (req, res) => {
    const query = "SELECT * FROM orders ORDER BY created_at DESC";
    db.query(query, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });

        res.json(results);
    });
};

// 查询未完成订单
export const getPendingOrders = (req, res) => {
    const query = "SELECT * FROM orders WHERE status IN ('pending','assigned','in-progress') ORDER BY created_at DESC";
    db.query(query, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });

        res.json(results);
    });
};

// 月度订单统计
export const getMonthlyStats = (req, res) => {
    const query = `
        SELECT 
            DATE_FORMAT(created_at, '%Y-%m') as month,
            COUNT(*) as total_orders
        FROM orders
        GROUP BY month
        ORDER BY month DESC
    `;
    db.query(query, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });

        res.json(results);
    });
};

// 管理员创建员工
export const createEmployee = (req, res) => {
    const { name, email, password } = req.body;

    // 检查 email 是否已存在
    const checkQuery = "SELECT * FROM users WHERE email = ?";
    db.query(checkQuery, [email], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.length > 0) return res.status(400).json({ error: "Email 已被注册" });

        // 加密密码
        const hashedPassword = bcrypt.hashSync(password, 10);

        const insertQuery = "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, 'employee')";
        db.query(insertQuery, [name, email, hashedPassword], (err, results) => {
            if (err) return res.status(500).json({ error: err.message });

            res.json({ message: "员工创建成功", employeeId: results.insertId });
        });
    });
};
