import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import db from "../config/db.js";

const JWT_SECRET = process.env.JWT_SECRET;

// 注册
export const register = (req, res) => {
    const { name, email, password, role } = req.body;

    // 先检查 email 是否已存在
    const checkQuery = "SELECT * FROM users WHERE email = ?";
    db.query(checkQuery, [email], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.length > 0) return res.status(400).json({ error: "Email 已被注册" });

        // 加密密码
        const hashedPassword = bcrypt.hashSync(password, 10);

        const insertQuery = "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)";
        db.query(insertQuery, [name, email, hashedPassword, role || "customer"], (err, results) => {
            if (err) return res.status(500).json({ error: err.message });

            const token = jwt.sign({ id: results.insertId, role: role || "customer" }, JWT_SECRET, { expiresIn: "7d" });
            res.json({ message: "注册成功", token });
        });
    });
};

// 登录
export const login = (req, res) => {
    const { email, password } = req.body;

    const query = "SELECT * FROM users WHERE email = ?";
    db.query(query, [email], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.length === 0) return res.status(400).json({ error: "用户不存在" });

        const user = results[0];
        const isMatch = bcrypt.compareSync(password, user.password);
        if (!isMatch) return res.status(400).json({ error: "密码错误" });

        const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, { expiresIn: "7d" });
        res.json({ message: "登录成功", token, user: { id: user.id, name: user.name, email: user.email, role: user.role } });
    });
};
