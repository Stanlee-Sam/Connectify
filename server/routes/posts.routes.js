import { Router } from "express";

import { getFeedPosts, getUserPosts,createPost } from '../controllers/posts.controller.js'
import { verifyToken } from "../middleware/auth.middleware.js";

const router = Router();

router.post("/", verifyToken, createPost)
router.get("/", verifyToken, getFeedPosts)
router.get("/:userId/posts", verifyToken, getUserPosts)

// router.post("/:id/like", verifyToken, likePost)

export default router