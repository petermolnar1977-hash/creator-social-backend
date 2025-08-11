import { Router } from "express";
import { signup, verifyEmail } from "../controllers/authController";

const router = Router();
router.post("/signup", signup);
router.get("/verify", verifyEmail);

export default router;
