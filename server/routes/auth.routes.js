import express from "express";
import { login } from "../controllers/auth.controller.js";

const router = express.Router();

// Login 
router.post("/login", login);

export default router;
