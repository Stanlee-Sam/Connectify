import { Router } from "express";

import { getComment } from "../controllers/comments.controller.js";

const router = Router();



router.get('/:postId',  getComment )
export default router;
