import { Router } from "express";
import { servePublic, servePrivate, servePrivateVerified } from "../controllers/test.controller";
import { authenticate } from "../middlewares/auth.middleware";

const router = Router();

router.get("/public", servePublic);

router.get("/private", authenticate, servePrivate);

router.get("/private/verified", authenticate, servePrivateVerified);

export default router;