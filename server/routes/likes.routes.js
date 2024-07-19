import { Router } from "express";
import { verifyToken } from "../middleware/auth.middleware.js";
import {  likePost } from '../controllers/likes.controller.js'



const router = Router();

router.post("/:id/like", verifyToken, likePost)



export default router