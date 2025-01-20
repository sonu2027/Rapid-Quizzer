import { Router } from "express";
import { insertContest, fetchContest } from "../controllers/contest.controller.js";

const router = Router();
router.route("/insertcontest").post(insertContest);
router.route("/fetchcontest").get(fetchContest);

export default router;