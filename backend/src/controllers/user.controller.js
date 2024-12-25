import {
  deleteFromCloudinary,
  uploadOnCloudinary,
} from "../utils/cloudinary.js";
import nodemailer from "nodemailer";
import fs from "fs";
import { User } from "../models/user.model.js";
import path from "path";

const registerUser = async (req, res) => {
  const { fullName, email, username, password } = req.body;

  console.log("req.body........", req.body);

  const existedUser = await User.findOne({
    $or: [{ username }, { email }],
  });

  let userExist = false;
  if (existedUser) {
    userExist = true;
    return res.status(201).json({
      userExist,
      message: "User alreday exist",
    });
  }

  const user = await User.create({
    fullName,
    email,
    password,
    username,
  });

  const createdUser = await User.findById(user._id);

  if (!createdUser) {
    throw new ApiError(500, "Something went wrong while registering the user");
  }

  let users = createdUser;
  console.log("user details: ", users);

  const userData = JSON.stringify({
    id: users._id,
    username: users.username,
    email: users.email,
    password: users.password,
    fullName: users.fullName,
  });

  res.cookie("userDetail", userData, {
    httpOnly: true,
    secure: true,
    maxAge: 24 * 60 * 60 * 1000, // 1 day
    signed: true,
    domain: ".quizrecommendationbackend.vercel.app", // Use backend's domain
    sameSite: "None", // Allow cross-site cookies
    path: "/",
  });

  return res.status(201).json({
    data: createdUser,
    userExist,
    message: "User registered Successfully",
  });
};

const loginUser = async (req, res) => {
  console.log("req.body in login: ", req.body);
  const { username, password } = req.body;
  try {
    const foundUserEmail = await User.findOne({ email: username });
    const foundUserUsername = await User.findOne({ username });
    let passwordNotMatch = false;
    if (foundUserEmail) {
      passwordNotMatch = await User.findOne({ email: username, password });
    } else if (foundUserUsername) {
      passwordNotMatch = await User.findOne({ username, password });
    }

    if ((foundUserEmail || foundUserUsername) && passwordNotMatch) {
      if (foundUserEmail) {
        let user = foundUserEmail;
        console.log("user details: ", user);

        const userData = JSON.stringify({
          id: user._id,
          username: user.username,
          email: user.email,
          password: user.password,
          fullName: user.fullName,
        });

        res.cookie("userDetail", userData, {
          httpOnly: true,
          secure: true,
          maxAge: 24 * 60 * 60 * 1000, // 1 day
          signed: true,
          domain: ".quizrecommendationbackend.vercel.app", // Use backend's domain
          sameSite: "None", // Allow cross-site cookies
          path: "/",
        });

        console.log("cookies stored: ", req.signedCookies.userDetail);

        console.log("Cookies sent: ", res.getHeaders()["set-cookie"]);

        res.status(200).json({
          data: foundUserEmail,
          message: "User logged in Successfully",
          status: true,
        });
      } else {
        let user = foundUserUsername;
        console.log("user details: ", user);

        const userData = JSON.stringify({
          id: user._id,
          username: user.username,
          email: user.email,
          password: user.password,
          fullName: user.fullName,
        });

        res.cookie("userDetail", userData, {
          httpOnly: true,
          secure: true,
          maxAge: 24 * 60 * 60 * 1000, // 1 day
          signed: true,
          domain: ".quizrecommendationbackend.vercel.app", // Use backend's domain
          sameSite: "None", // Allow cross-site cookies
          path: "/",
        });

        res.status(200).json({
          data: foundUserEmail,
          message: "User logged in Successfully",
          status: true,
        });
      }
    } else if ((foundUserEmail || foundUserUsername) && !passwordNotMatch) {
      res.status(500).json({
        data: foundUserEmail,
        message: "wrong password",
        status: false,
      });
    } else {
      res.status(500).json({
        data: foundUserEmail,
        message: "username doesn't exist",
        status: "username doesn't exist",
      });
    }
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({
      message: "Something went wrong",
      status: "something went wrong",
    });
  }
};

const logoutUser = async (req, res) => {
  res.clearCookie("userDetail", {
    domain: ".quizrecommendationbackend.vercel.app",
    path: "/",
  });

  res.status(200).json({ message: "cookie deleted successffully" });
};

const changePassword = async (req, res) => {
  console.log("req.body: ", req.body);
  const { email, password } = req.body;
  try {
    const response = await User.updateOne({ email }, { password: password });
    console.log("Response: ", response);
    res.status(200).json({
      response,
      message: "Password changed ssuccessfully",
      status: true,
    });
  } catch (error) {
    console.log("error while updating password: ", error);
    res.status(500).json({ message: "Something went wrong", status: false });
  }
};

const checkEmailExistence = async (req, res) => {
  console.log("req.body: ", req.body);
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    console.log("user found is: ", user);
    if (user) {
      res.status(200).json({ user, message: "User found", status: true });
    } else {
      res
        .status(200)
        .json({ user, message: "User doesn't found", status: false });
    }
  } catch (error) {
    console.error("Server Error", error);
    res.status(500).json({ message: "Internal Server Error", status: false });
  }
};

const checkCookies = async (req, res) => {
  let userCookie = req.signedCookies.userDetail;

  // Check if the cookie exists before attempting to parse it
  if (!userCookie) {
    console.log("Cookie doesn't exist: ", userCookie);
    return res.status(200).json({ status: 0, message: "Cookies don't exist" });
  }

  try {
    userCookie = JSON.parse(userCookie);
    const userCookieKeys = Object.keys(userCookie);
    console.log(
      "userCookies and userCookieKeys's length: ",
      userCookie,
      userCookieKeys.length
    );

    if (userCookieKeys.length > 0) {
      console.log("cookie exists");
      return res.status(200).json({ status: 1, message: "Cookies exist" });
    } else {
      console.log("cookie doesn't exist");
      return res
        .status(200)
        .json({ status: 0, message: "Cookies don't exist" });
    }
  } catch (error) {
    console.error("Error parsing cookie:", error);
    return res.status(500).json({
      status: 0,
      message: "Error processing cookies",
    });
  }
};

const sendemailverificationcode = async (req, res) => {
  const { code, email } = req.body;

  console.log("req.body: ", req.body);

  // Create a transporter object using SMTP transport
  let transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: "sonu.mondal.2027@gmail.com",
      pass: "ghfs wdlk pkwd pjmg",
    },
  });

  console.log("transporter: ", transporter);

  // Setup email data
  let mailOptions = {
    from: "sonu.mondal.2027@gmail.com",
    to: email,
    subject: "Email Verification Code",
    text: `Welcome to quiz recommendation website. Please, verify your email by entering the code. Your verification code is: ${code}`,
  };

  console.log("mailOptions: ", mailOptions);

  try {
    // Send mail with defined transport object
    await transporter.sendMail(mailOptions);
    res.send("Email sent successfully");
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).send("Error sending email");
  }
};

export {
  registerUser,
  loginUser,
  logoutUser,
  checkCookies,
  changePassword,
  sendemailverificationcode,
  checkEmailExistence,
};
