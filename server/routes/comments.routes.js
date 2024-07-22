import { Router } from "express";

import { getComment,addComment } from "../controllers/comments.controller.js";

const router = Router();



router.get('/:postId',  getComment )
router.post('/', addComment)
export default router;
