import { Router } from "express";
import { login, register, refresh, verifyEmail, verifyEmailToken, logout } from "../controllers/auth.controller";
import { authenticate } from "../middlewares/auth.middleware";

const router = Router();

// Authentication
router.post("/register", register);
router.post("/login", login);
router.delete("/logout", authenticate, logout);

// Email verification
router.put("/verify", authenticate, verifyEmail);
router.get("/verify/:token", verifyEmailToken);

// Refresh token
router.post("/refresh", refresh);

export default router;