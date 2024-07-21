import { Router } from "express";
import {
  getUser,
  getUserFriends,
  addRemoveFriend,
} from "../controllers/users.controller.js";
import { verifyToken } from "../middleware/auth.middleware.js";
const router = Router();

// router.get("/:id", verifyToken, getUser);
router.get("/user", verifyToken, getUser);
// router.get("/:id/friends", verifyToken, getUserFriends);
router.get("/user/:id/friends", verifyToken, getUserFriends);

// router.patch("/:id/:friendId", verifyToken, addRemoveFriend);
router.patch("/user/:id/:friendId", verifyToken, addRemoveFriend);

export default router;
