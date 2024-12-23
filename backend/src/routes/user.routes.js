import { Router } from "express";
import {
  registerUser,
  loginUser,
  sendemailverificationcode
} from "../controllers/user.controller.js";
// import { upload } from "../middlewares/multer.middleware.js";
// import { uploadImage } from "../controllers/image.controller.js";

const router = Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/sendemailverificationcode").post(sendemailverificationcode);

export default router;