import pool from "../database/db.js";

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

