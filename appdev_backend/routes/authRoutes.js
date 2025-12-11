import { Router } from "express";
import multer from "multer"; // Import multer for file uploads
import { registerUser, loginUser, completeProfile } from "../controllers/authController.js";

// Set up multer storage configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Define the folder where files will be stored
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname); // Define how the filename should be saved
    }
});

// Initialize Multer with the storage configuration
const upload = multer({ storage: storage });

const router = Router();

// POST /api/auth/signup
router.post("/signup", registerUser);

// POST /api/auth/login
router.post("/login", loginUser);

// POST /api/auth/complete-profile
// Use upload.single('resume') to handle the single file upload with the field name 'resume'
router.post("/complete-profile", upload.single('resume'), completeProfile);

export default router;
