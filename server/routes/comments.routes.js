import { Router } from "express";
import { verifyToken } from "../middleware/auth.middleware.js";


import { getComment,addComment,deleteComment } from "../controllers/comments.controller.js";

const router = Router();



router.get('/:postId',  getComment )
router.post('/', addComment)
router.delete("/:commentId", verifyToken, deleteComment);
export default router;
