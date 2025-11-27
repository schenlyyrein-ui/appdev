// controllers/authController.js
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import pool from "../database/db.js";

const JWT_SECRET = process.env.JWT_SECRET || "dev_secret_key";

/**
 * POST /api/auth/signup
 * Body: { fullname, email, username, password, role? }
 * role: optional, one of 'freelancer', 'client', 'admin'
 */
export const registerUser = async (req, res) => {
  try {
    const { fullname, email, username, password, role } = req.body;

    if (!fullname || !username || !password) {
      return res
        .status(400)
        .json({ message: "fullname, username, and password are required" });
    }

    // ✅ Normalize / validate role
    const allowedRoles = ["freelancer", "client", "admin"];
    let normalizedRole = "freelancer"; // default
    if (role && allowedRoles.includes(role.toLowerCase())) {
      normalizedRole = role.toLowerCase();
    }

    // Check if username/email already exists
    const [existing] = await pool.query(
      "SELECT user_id FROM users WHERE username = ? OR email = ?",
      [username, email || null]
    );

    if (existing.length > 0) {
      return res
        .status(409)
        .json({ message: "Username or email already in use" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const password_hash = await bcrypt.hash(password, salt);

    // Insert new user WITH ROLE
    const [result] = await pool.query(
      "INSERT INTO users (fullname, email, username, password_hash, role) VALUES (?, ?, ?, ?, ?)",
      [fullname, email || null, username, password_hash, normalizedRole]
    );

    const userId = result.insertId;

    // Create JWT
    const token = jwt.sign(
      { user_id: userId, username, role: normalizedRole },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    return res.status(201).json({
      message: "User registered successfully",
      user: {
        user_id: userId,
        fullname,
        email,
        username,
        role: normalizedRole,
      },
      token,
    });
  } catch (err) {
    console.error("Error in registerUser:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

/**
 * POST /api/auth/login
 * Body: { identifier, password }
 * identifier: username OR email
 */
export const loginUser = async (req, res) => {
  try {
    const { identifier, password } = req.body;
    // identifier = username OR email

    if (!identifier || !password) {
      return res
        .status(400)
        .json({ message: "identifier and password are required" });
    }

    // ✅ Include role in the SELECT
    const [rows] = await pool.query(
      "SELECT user_id, fullname, email, username, password_hash, role FROM users WHERE username = ? OR email = ? LIMIT 1",
      [identifier, identifier]
    );

    if (rows.length === 0) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const user = rows[0];

    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      {
        user_id: user.user_id,
        username: user.username,
        role: user.role,
      },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    return res.json({
      message: "Login successful",
      user: {
        user_id: user.user_id,
        fullname: user.fullname,
        email: user.email,
        username: user.username,
        role: user.role, // 👈 IMPORTANT
      },
      token,
    });
  } catch (err) {
    console.error("Error in loginUser:", err);
    return res.status(500).json({ message: "Server error" });
  }
};
