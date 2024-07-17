import { Router } from "express";
import {getUser,getUserFriends, addRemoveFriend} from '../controllers/users.controller.js'
import { verifyToken } from "../middleware/auth.middleware.js";
const router = Router();

// Get all users
router.get('/:id', verifyToken, getUser)
router.get('/:id/friends',  verifyToken, getUserFriends)
router.get('/:id/users', verifyToken, getUser)

export default router