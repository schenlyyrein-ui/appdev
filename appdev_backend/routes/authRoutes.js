// routes/authRoutes.js
import { Router } from "express";
import { registerUser, loginUser, completeProfile} from "../controllers/authController.js";

const router = Router();

// POST /api/auth/signup
router.post("/signup", registerUser);

// POST /api/auth/login
router.post("/login", loginUser);

// POST /api/auth/complete-profile (Complete the freelancer profile)
router.post("/complete-profile", completeProfile);


export default router;
