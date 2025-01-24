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
  const { contestId } = req.body;
  let userCookie = req.signedCookies.userDetail;
  userCookie = JSON.parse(userCookie);
  const userId = userCookie.id;

  try {
    const response = await Contest.updateOne(
      { _id: contestId },
      { $addToSet: { userRegistered: userId } }
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
        if (e == userId) {
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

export {
  fetchContest,
  UserRegistartionForContest,
  checkUserContestRegistration,
  addContest,
};
