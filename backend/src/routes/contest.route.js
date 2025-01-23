import { Router } from "express";
import { insertContest, fetchContest, UserRegistartionForContest, checkUserContestRegistration } from "../controllers/contest.controller.js";

const router = Router();
router.route("/insertcontest").post(insertContest);
router.route("/fetchcontest").get(fetchContest);
router.route("/userregistartionforcontest").put(UserRegistartionForContest);
router.route("/checkusercontestregistration").post(checkUserContestRegistration);

export default router;