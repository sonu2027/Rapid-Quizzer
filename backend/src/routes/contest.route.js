import { Router } from "express";
import {
  fetchContest,
  UserRegistartionForContest,
  checkUserContestRegistration,
  addContest,
  setScoreAndTimetaken,
  checkUserContestAttempted,
} from "../controllers/contest.controller.js";

const router = Router();
router.route("/fetchcontest").get(fetchContest);
router.route("/userregistartionforcontest").put(UserRegistartionForContest);
router
  .route("/checkusercontestregistration")
  .post(checkUserContestRegistration);
router.route("/addcontest").post(addContest);
router.route("/setscoreandtimetaken").put(setScoreAndTimetaken);
router.route("/checkusercontestattempted").post(checkUserContestAttempted);

export default router;