import jwt from 'jsonwebtoken';
import db from "../connect.js";


export const login = (req, res) => {
    const q = "SELECT * FROM admin WHERE email = ?";
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
      
        const { password, ...others } = data[0];
        res.cookie("accessToken", token, { httpOnly: true }).status(200).json(others);
    });
};

export const logout = (req, res) => {
    res.clearCookie("accessToken", {
        secure: true,
        sameSite: "none"
    }).status(200).json("User is logged out");
};
