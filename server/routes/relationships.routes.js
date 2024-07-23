import { Router } from "express";
import { getRelationship, addRelationship, deleteRelationship } from "../controllers/relationships.controller.js"

const router = Router();

router.get("/:userId", getRelationship)
router.post("/", addRelationship)
router.delete("/", deleteRelationship)

export default router;