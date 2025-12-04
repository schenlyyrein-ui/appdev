// controllers/authController.js
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import pool from "../database/db.js";

const JWT_SECRET = process.env.JWT_SECRET || "dev_secret_key";

/**
 * POST /api/auth/signup
 * Body: { fullname, email, password, role? }
 */
export const registerUser = async (req, res) => {
  try {
    // 1. REMOVED 'username' from input
    const { fullname, email, password, role } = req.body;

    if (!fullname || !email || !password) {
      return res
        .status(400)
        .json({ message: "fullname, email, and password are required" });
    }

    const allowedRoles = ["freelancer", "client", "admin"];
    let normalizedRole = "freelancer"; 
    if (role && allowedRoles.includes(role.toLowerCase())) {
      normalizedRole = role.toLowerCase();
    }

    // 2. CHECK ONLY EMAIL (Removed username check)
    const [existing] = await pool.query(
      "SELECT user_id FROM users WHERE email = ?",
      [email]
    );

    if (existing.length > 0) {
      return res
        .status(409)
        .json({ message: "Email already in use" });
    }

    const salt = await bcrypt.genSalt(10);
    const password_hash = await bcrypt.hash(password, salt);

    // 3. INSERT ONLY EMAIL (Removed username column)
    const [result] = await pool.query(
      "INSERT INTO users (fullname, email, password_hash, role) VALUES (?, ?, ?, ?)",
      [fullname, email, password_hash, normalizedRole]
    );

    const userId = result.insertId;

    // 4. REMOVED username from Token
    const token = jwt.sign(
      { user_id: userId, email, role: normalizedRole },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    return res.status(201).json({
      message: "User registered successfully",
      user: {
        user_id: userId,
        fullname,
        email,
        role: normalizedRole,
      },
      token,
    });
  } catch (err) {
    console.error("Error in registerUser:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

export const loginUser = async (req, res) => {
  try {
    console.log("Login Request Body:", req.body); 

    const { email, identifier, password } = req.body; 

    const loginEmail = email || identifier;

    if (!loginEmail || !password) {
      console.log("Missing fields:", { loginEmail, password });
      return res.status(400).json({ message: "Email and password are required" });
    }

    const [rows] = await pool.query(
      "SELECT user_id, fullname, email, password_hash, role FROM users WHERE email = ? LIMIT 1",
      [loginEmail] 
    );

    if (rows.length === 0) {
      return res.status(401).json({ message: "Invalid credentials (User not found)" });
    }

    const user = rows[0];

    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials (Wrong password)" });
    }

    const token = jwt.sign(
      {
        user_id: user.user_id,
        email: user.email,
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
        role: user.role,
      },
      token,
    });
  } catch (err) {
    console.error("Error in loginUser:", err);
    return res.status(500).json({ message: "Server error" });
  }
};