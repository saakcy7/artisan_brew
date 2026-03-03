import express from "express";
import { registerUser, loginUser,getProfile } from "../controllers/authController.js";
import { protect } from "../middlewares/authMiddleware.js";
import { upload } from "../middlewares/upload.js";

const router = express.Router();

router.post("/register",upload.single("photo"), registerUser);
router.post("/login", loginUser);
router.get("/me",protect, getProfile);
router.put("/me",protect, getProfile);


export default router;