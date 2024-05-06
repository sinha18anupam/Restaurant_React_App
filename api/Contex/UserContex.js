import jwt from 'jsonwebtoken';
import db from "../connect.js";

export const register = (req, res) => {
    const q = "SELECT * FROM users WHERE email = ?";
    db.query(q, [req.body.email], (err, data) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        if (data.length > 0) {
            return res.status(409).json({ error: "User already exists" });
        }

        const insertQuery = "INSERT INTO users (email, password, username) VALUES (?, ?, ?)";
        const values = [
            req.body.email,
            req.body.password,
            req.body.username
        ];

        db.query(insertQuery, values, (err) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            return res.status(200).json({ message: "User created successfully" });
        });
    });
};



export const login = (req, res) => {
    const q = "SELECT * FROM users WHERE email = ?";
    db.query(q, [req.body.email], (err, data) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        } 
        if (data.length === 0) {
            return res.status(400).json({ error: "User not found" });
        }
        if (req.body.password !== data[0].password) {
            return res.status(401).json({ error: "User credentials do not match" });
        }
        const token = jwt.sign({ id: data[0].id }, "secretkey");
      
        console.log("JWT Key:", token); // Logging the JWT key
        
        const { password, ...others } = data[0];
        res.cookie("accessToken", token, { httpOnly: true }).status(200).json({ token, ...others });
    });
};


export const logout = (req, res) => {
    res.clearCookie("accessToken", {
        secure: true,
        sameSite: "none"
    }).status(200).json("User is logged out");
};
