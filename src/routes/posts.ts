import { Router } from "express";
import upload from "../middleware/uploadMiddleware";
import { createPost, getPublicFeed } from "../controllers/postController";
import { authenticate } from "../middleware/authMiddleware";

const router = Router();

router.post("/", authenticate, upload.single("media"), createPost);
router.get("/feed", getPublicFeed);

export default router;
