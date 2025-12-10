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

/**
 * PUT /api/admin/freelancer/:id/verify
 * Body: { status } (status: 'approved' or 'rejected')
 */
export const verifyFreelancer = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!status || !['approved', 'rejected'].includes(status)) {
      return res.status(400).json({ message: "Invalid status. Must be 'approved' or 'rejected'" });
    }

    // Update freelancer's status in the database
    const query = "UPDATE freelancers SET status = ? WHERE id = ?";
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

  try {
    // 1. Update the freelancer's status to 'approved' in the freelancers table
    await pool.query("UPDATE freelancers SET status = 'approved' WHERE id = ?", [id]);

    // 2. Get the freelancer's data from the freelancers table
    const [freelancerData] = await pool.query("SELECT * FROM freelancers WHERE id = ?", [id]);

    if (freelancerData.length === 0) {
      return res.status(404).json({ message: 'Freelancer not found' });
    }

    // 3. Insert the approved freelancer into the 'users' table
    const { full_name, email, date_of_birth, location, contact_number, skills_services, resume_file_path } = freelancerData[0];

    await pool.query(`
      INSERT INTO users (fullname, email, date_of_birth, location, contact_number, skills_services, resume_file_path, role, is_active)
      VALUES (?, ?, ?, ?, ?, ?, ?, 'freelancer', 1)
    `, [full_name, email, date_of_birth, location, contact_number, skills_services, resume_file_path]);

    return res.status(200).json({ message: 'Freelancer approved and moved to users table.' });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error. Please try again later.' });
  }
};
