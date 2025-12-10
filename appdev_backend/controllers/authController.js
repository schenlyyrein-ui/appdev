// controllers/authController.js
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import pool from "../database/db.js";

const JWT_SECRET = process.env.JWT_SECRET || "dev_secret_key";

/**
 * POST /api/auth/signup
 * Body: { fullname, email, password, role? }
 */
// controllers/authController.js
export const registerUser = async (req, res) => {
  try {
    const { fullname, email, password, role } = req.body;

    // Ensure the required fields are present
    if (!fullname || !email || !password) {
      return res.status(400).json({ message: "fullname, email, and password are required" });
    }

    // If the role is missing, default it based on the page
    let normalizedRole = "freelancer"; // Default to "freelancer" for signups from the freelancer page
    if (role && ["freelancer", "admin"].includes(role.toLowerCase())) {
      normalizedRole = role.toLowerCase();
    }

    // Check if the email already exists (check both users and verification tables)
    const [existing] = await pool.query("SELECT user_id FROM users WHERE email = ?", [email]);
    const [existingVerification] = await pool.query("SELECT id FROM verification WHERE email = ?", [email]);

    if (existing.length > 0 || existingVerification.length > 0) {
      return res.status(409).json({ message: "Email already in use" });
    }

    // Hash the password for security
    const salt = await bcrypt.genSalt(10);
    const password_hash = await bcrypt.hash(password, salt);

    // Insert into the appropriate table based on the role
    if (normalizedRole === "admin") {
      // Insert into users table for admin
      const [result] = await pool.query(
        "INSERT INTO users (fullname, email, password_hash, role) VALUES (?, ?, ?, ?)",
        [fullname, email, password_hash, normalizedRole]
      );

      const userId = result.insertId;
      const token = jwt.sign({ user_id: userId, email, role: normalizedRole }, JWT_SECRET, { expiresIn: "1h" });

      return res.status(201).json({
        message: "Admin registered successfully",
        user: { user_id: userId, fullname, email, role: normalizedRole },
        token,
      });
    } else if (normalizedRole === "freelancer") {
      // Insert into verification table for freelancer
      const [result] = await pool.query(
        "INSERT INTO verification (full_name, email, password_hash, status) VALUES (?, ?, ?, 'pending')",
        [fullname, email, password_hash]
      );

      const userId = result.insertId;
      return res.status(201).json({
        message: "Freelancer registered successfully. Pending admin approval.",
        user: { user_id: userId, fullname, email, role: "freelancer" },
      });
    }
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

// controllers/authController.js

export const completeProfile = async (req, res) => {
  try {
    const { full_name, email, date_of_birth, location, contact_number, skills_services } = req.body;
    const resumeFilePath = req.file ? req.file.path : null; // Handle file upload

    // Ensure all required fields are provided
    if (!full_name || !email || !date_of_birth || !location || !contact_number || !skills_services) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Update the freelancer's information in the verification table
    const query = `
      UPDATE verification
      SET full_name = ?, date_of_birth = ?, location = ?, contact_number = ?, skills_services = ?, resume_file_path = ?
      WHERE email = ? AND status = 'pending'
    `;
    const values = [full_name, date_of_birth, location, contact_number, skills_services, resumeFilePath, email];

    const [result] = await pool.query(query, values);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Freelancer not found or not in pending status' });
    }

    return res.status(200).json({
      message: 'Profile updated successfully. Awaiting admin approval.',
    });
  } catch (error) {
    console.error('Error in completeProfile:', error);
    return res.status(500).json({ message: 'Server error. Please try again later.' });
  }
};

