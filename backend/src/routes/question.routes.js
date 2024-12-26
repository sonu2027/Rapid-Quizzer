import { Router } from "express";
import { insertQuestion, fetchQuestion } from "../controllers/question.controller.js";

const router = Router();
router.route("/insertquestion").post(insertQuestion);
router.route("/fetchquestion").get(fetchQuestion);

export default router;