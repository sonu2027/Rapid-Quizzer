import { Router } from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
  sendemailverificationcode,
  checkCookies,
  changePassword,
  checkEmailExistence,
} from "../controllers/user.controller.js";
// import { upload } from "../middlewares/multer.middleware.js";
// import { uploadImage } from "../controllers/image.controller.js";

const router = Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").post(logoutUser);
router.route("/checkcookies").get(checkCookies);
router.route("/changepassword").put(changePassword);
router.route("/checkemailexistence").post(checkEmailExistence);
router.route("/sendemailverificationcode").post(sendemailverificationcode);

export default router;