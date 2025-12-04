import { Router } from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { adminOnly } from "../middleware/adminMiddleware.js";
import {
  getAllUsers,
  updateUserProfile, // <--- Import the new function
  deactivateUser,
  reactivateUser,
} from "../controllers/adminController.js";

const router = Router();

router.use(authMiddleware, adminOnly);

// READ all users
router.get("/users", getAllUsers);

// UPDATE user profile (Name, Email, Role)
router.patch("/users/:id/profile", updateUserProfile); 

// SOFT DELETE user
router.delete("/users/:id", deactivateUser);

// REACTIVATE user
router.patch("/users/:id/reactivate", reactivateUser);

export default router;