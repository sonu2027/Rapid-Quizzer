import { Contest } from "../models/contest.model.js";

const fetchContest = async (req, res) => {
  try {
    const contest = await Contest.find();
    console.log("Contets: ", contest);
    res.status(201).json(contest);
  } catch (error) {
    res.status(500).json({ error });
  }
};

const UserRegistartionForContest = async (req, res) => {
  const { contestId, initialScore, timeTaken } = req.body;
  let userCookie = req.signedCookies.userDetail;
  userCookie = JSON.parse(userCookie);
  const userId = userCookie.id;

  try {
    const response = await Contest.updateOne(
      { _id: contestId },
      { $addToSet: { userRegistered: [userId, initialScore, timeTaken] } }
    );
    console.log("response: ", response);

    if (response) {
      res.status(200).json({
        response,
        status: true,
        message: "user registered successfully",
      });
      return;
    }
    res.status(500).json({ status: false, message: "user registered failed" });
  } catch (error) {
    console.log("error is: ", error);
    res.status(500).json({ error: "something went wrong" });
  }
};

const checkUserContestRegistration = async (req, res) => {
  const { contestId } = req.body;
  let userCookie = req.signedCookies.userDetail;
  userCookie = JSON.parse(userCookie);
  const userId = userCookie.id;

  try {
    const response = await Contest.findOne({ _id: contestId });
    console.log("response: ", response);

    let userFound = false;

    if (response) {
      response.userRegistered.map((e) => {
        if (e[0] == userId) {
          userFound = true;
        }
      });
    }
    if (userFound)
      res.status(200).json({
        response,
        status: true,
        message: "user registered",
      });
    else
      res.status(500).json({ status: false, message: "user not registered" });
  } catch (error) {
    console.log("error is: ", error);
    res.status(500).json({ error: "something went wrong" });
  }
};

const addContest = async (req, res) => {
  console.log("addContest data: ", req.body);
  const { date, subject, chapter, totalQuestion } = req.body;
  const temp = Number(totalQuestion);
  try {
    const contest = await Contest.create({
      date,
      subject,
      chapter,
      totalQuestion: temp,
    });

    return res.status(201).json({
      data: contest,
      message: "Contest added Successfully",
    });
  } catch (error) {
    console.log("Error is: ", error);
    return res.status(500).json({
      error,
      message: "Something went wrong while adding contest",
    });
  }
};

const setScoreAndTimetaken = async (req, res) => {
  console.log("req.scoreandtime: ", req.body);
  const { contestId, score, timeTaken } = req.body;

  let userCookie = req.signedCookies.userDetail;
  userCookie = JSON.parse(userCookie);
  const userId = userCookie.id;
  const username = userCookie.username;
  const fullName = userCookie.fullName;

  try {
    const contest = await Contest.updateOne(
      { _id: contestId },
      {
        $addToSet: {
          performance: [userId, score, timeTaken, username, fullName],
        },
      }
    );
    if (contest) {
      res.status(200).json({
        contest,
        status: true,
        message: "user score submitted successfully",
      });
      return;
    }
    res
      .status(500)
      .json({ status: false, message: "user score submission failed" });
  } catch (error) {
    console.log("error is: ", error);
    res.status(500).json({ error: "something went wrong" });
  }
};

const checkUserContestAttempted = async (req, res) => {
  console.log("data got from client: ", req.body);
  const { contestId } = req.body;
  let userCookie = req.signedCookies.userDetail;
  if (!userCookie) {
    res
      .status(400)
      .json({ message: "Internal server error, cookies don't exist" });
    return;
  }

  userCookie = JSON.parse(userCookie);
  const userId = userCookie.id;
  const username = userCookie.username;
  const fullName = userCookie.fullName;

  let searchUserId = false;

  try {
    const contest = await Contest.findById({ _id: contestId });

    if (contest) {
      contest.performance.map((e) => {
        if (e[0] == userId) {
          searchUserId = true;
          console.log(
            "e[0] and userId: ",
            e[0],
            userId,
            typeof e[0],
            typeof userId
          );
        }
      });
      if (searchUserId)
        res.status(200).json({ message: "user had attempted the quiz" });
      else res.status(500).json({ message: "User hadn't attempted the quiz" });
      return;
    }
    res.status(500).json({ message: "Contest doesn't found" });
  } catch (error) {
    console.log("error is: ", error);
    res.status(400).json({ error: "Internal server error" });
  }
};

export {
  fetchContest,
  UserRegistartionForContest,
  checkUserContestRegistration,
  addContest,
  setScoreAndTimetaken,
  checkUserContestAttempted,
};
