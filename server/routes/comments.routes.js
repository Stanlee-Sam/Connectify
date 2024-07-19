import { Router } from "express";

import { addComment } from "../controllers/comments.controller.js";

const router = Router();



router.post('/',  addComment )
export default router;
