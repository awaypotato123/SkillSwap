import { Router } from "express";
import { getSkillById, getAllSkills, createSkill, deleteSkill } from "../controllers/skill.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = Router();


router.get("/", getAllSkills);
router.get("/:id", getSkillById);


router.post("/", protect, createSkill);
router.delete("/:id", protect, deleteSkill);

export default router;