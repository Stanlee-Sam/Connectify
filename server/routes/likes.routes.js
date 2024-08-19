import { Router } from "express";
import { verifyToken } from "../middleware/auth.middleware.js";
import {
  likePost,
  getLikes,
  dislikePost,
} from "../controllers/likes.controller.js";

const router = Router();

router.post("/:postId/like", verifyToken, likePost);
router.delete("/:postId/dislike", verifyToken, dislikePost);
router.get("/:postId/likes", verifyToken, getLikes);

export default router;
