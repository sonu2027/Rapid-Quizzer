import { Router } from "express";
import { insertQuestion } from "../controllers/question.controller.js";

const router = Router();
router.route("/insertquestion").post(insertQuestion);

export default router;