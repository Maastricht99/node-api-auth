import { Router } from "express";
import { login, register, verifyEmail, verifyEmailToken } from "../controllers/auth.controller";
import { authenticate } from "../middlewares/auth.middleware";

const router = Router();

// Authentication
router.post("/register", register);
router.post("/login", login);

// Email verification
router.get("/verify", authenticate, verifyEmail);
router.get("/verify/:token", verifyEmailToken);

export default router;