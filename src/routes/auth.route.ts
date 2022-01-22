import { Router } from "express";
import { login, register, refresh, verifyEmail, verifyEmailToken } from "../controllers/auth.controller";
import { authenticate } from "../middlewares/auth.middleware";

const router = Router();

// Authentication
router.post("/register", register);
router.post("/login", login);

// Email verification
router.get("/verify", authenticate, verifyEmail);
router.get("/verify/:token", verifyEmailToken);

// Refresh token
router.post("/refresh", refresh);

export default router;