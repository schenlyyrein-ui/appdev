import pool from "../database/db.js";
import bcrypt from 'bcryptjs'; 

// Admin Create User (Directly to Users Table)
export const createAdmin = async (req, res) => {
  try {
    const { fullname, email, password, role, status } = req.body;

    // 1. Check if user exists in USERS table
    const [existing] = await pool.query("SELECT user_id FROM users WHERE email = ?", [email]);
    if (existing.length > 0) {
      return res.status(409).json({ message: "Email already exists" });
    }

    // 2. Hash Password
    const salt = await bcrypt.genSalt(10);
    const password_hash = await bcrypt.hash(password, salt);

    // 3. Determine 'is_active' based on the status dropdown
    const isActive = status === 'Active' ? 1 : 0;

    // 4. Insert directly into USERS table (Bypassing Verification)
    await pool.query(
      `INSERT INTO users (fullname, email, username, password_hash, role, is_active) 
       VALUES (?, ?, ?, ?, ?, ?)`,
      [fullname, email, email, password_hash, role, isActive]
    );

    res.status(201).json({ 
      message: "User created successfully", 
      user: { fullname, email, role, status } 
    });

  } catch (err) {
    console.error("Error creating user:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// 1. GET all users (READ)

export const getAllUsers = async (req, res) => {
  try {
    // FIX: Removed 'username' and 'username as email'.
    // Now we just strictly select the 'email' column.
    const [users] = await pool.query(
      "SELECT user_id, fullname, email, role, is_active, created_at FROM users"
    );
    res.json(users);
  } catch (err) {
    console.error("Error getting users:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// 2. UPDATE user

export const updateUserProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const { fullname, email, role } = req.body;

    if (!fullname || !email || !role) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const [existing] = await pool.query(
      "SELECT user_id FROM users WHERE email = ? AND user_id != ?",
      [email, id]
    );

    if (existing.length > 0) {
      return res.status(409).json({ message: "Email is already in use by another user" });
    }

    await pool.query(
      "UPDATE users SET fullname = ?, email = ?, role = ? WHERE user_id = ?",
      [fullname, email, role, id]
    );

    res.json({ message: "User profile updated successfully" });
  } catch (err) {
    console.error("Error updating profile:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// 3. DELETE user (soft delete)
export const deactivateUser = async (req, res) => {
  try {
    const { id } = req.params;

    await pool.query(
      "UPDATE users SET is_active = 0 WHERE user_id = ?",
      [id]
    );

    res.json({ message: "User deactivated successfully" });
  } catch (err) {
    console.error("Error deactivating user:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// 4. REACTIVATE user

export const reactivateUser = async (req, res) => {
  try {
    const { id } = req.params;

    await pool.query(
      "UPDATE users SET is_active = 1 WHERE user_id = ?",
      [id]
    );

    res.json({ message: "User reactivated successfully" });
  } catch (err) {
    console.error("Error reactivating user:", err);
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * PUT /api/admin/freelancer/:id/verify
 * Use this for REJECTING
 */
export const verifyFreelancer = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    // Use 'verification' table, NOT 'freelancers'
    const query = "UPDATE verification SET status = ? WHERE id = ?";
    const values = [status, id];

    await pool.query(query, values);

    return res.status(200).json({ message: `Freelancer ${status} successfully.` });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error. Please try again later.' });
  }
};

// controllers/adminController.js

export const approveFreelancer = async (req, res) => {
  const { id } = req.params;
  
  const connection = await pool.getConnection();

  try {
    await connection.beginTransaction();

    // 1. GET data from 'verification' table
    const [applicants] = await connection.query("SELECT * FROM verification WHERE id = ?", [id]);

    if (applicants.length === 0) {
      await connection.rollback();
      return res.status(404).json({ message: 'Applicant not found' });
    }

    const applicant = applicants[0];

    // 2. CHECK if user already exists (to prevent duplicates)
    const [existingUser] = await connection.query("SELECT user_id FROM users WHERE email = ?", [applicant.email]);
    
    if (existingUser.length === 0) {
        // 3. INSERT into 'users' table
        // We only map the columns that EXIST in your users table:
        // fullname, email, username, password_hash, role, is_active
        await connection.query(`
          INSERT INTO users (fullname, email, username, password_hash, role, is_active)
          VALUES (?, ?, ?, ?, 'freelancer', 1)
        `, [
          applicant.full_name,     // Maps to fullname
          applicant.email,         // Maps to email
          applicant.email,         // Maps to username (Required by your DB)
          applicant.password_hash  // Maps to password_hash
        ]);
    }

    // 4. UPDATE status in 'verification' table
    await connection.query("UPDATE verification SET status = 'approved' WHERE id = ?", [id]);

    await connection.commit();
    return res.status(200).json({ message: 'Freelancer approved and moved to users table.' });

  } catch (error) {
    await connection.rollback();
    console.error("Error approving freelancer:", error);
    return res.status(500).json({ message: 'Server error during approval.' });
  } finally {
    connection.release();
  }
};

// GET all verification requests (Pending, Approved, Rejected)
export const getVerificationRequests = async (req, res) => {
  try {
    const [requests] = await pool.query(
      "SELECT * FROM verification ORDER BY created_at DESC"
    );
    res.json(requests);
  } catch (error) {
    console.error("Error fetching verification requests:", error);
    res.status(500).json({ message: "Server error" });
  }
};
