import { Router } from "express";
import {fetchContest, UserRegistartionForContest, checkUserContestRegistration, addContest } from "../controllers/contest.controller.js";

const router = Router();
router.route("/fetchcontest").get(fetchContest);
router.route("/userregistartionforcontest").put(UserRegistartionForContest);
router.route("/checkusercontestregistration").post(checkUserContestRegistration);
router.route("/addcontest").post(addContest);

export default router;