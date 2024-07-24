import { Router } from "express";
import {
  getAllUsers,
  getUser,
  updateUser,
  getUserFriends,
  addRemoveFriend,
} from "../controllers/users.controller.js";
import { verifyToken } from "../middleware/auth.middleware.js";
const router = Router();

router.get("/", verifyToken, getAllUsers);
router.put("/:userId", verifyToken, updateUser);
router.get("/:userId", verifyToken, getUser);
router.get("/user/:id/friends", verifyToken, getUserFriends);

router.patch("/user/:id/:friendId", verifyToken, addRemoveFriend);

export default router;
