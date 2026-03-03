import jwt from "jsonwebtoken";
import pool from "../config/db.js";

export const protect = async (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer ")) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      const result = await pool.query(
        "SELECT id, name, email, phone_number, photo_url FROM users WHERE id = $1",
        [decoded.id]
      );

      if (result.rows.length === 0) return res.status(404).json({ message: "User not found" });

      req.user = result.rows[0];
      next();
    } catch (err) {
      console.error(err);
      res.status(401).json({ message: "Invalid token" });
    }
  } else {
    res.status(401).json({ message: "No token provided" });
  }
};