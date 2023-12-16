import express from "express";
import {
  getUserProfileController,
  loginController,
  logoutController,
  passwordResetController,
  registerController,
  udpatePasswordController,
  updateProfileController,
  updateProfilePicController,
} from "../controllers/userController.js";
// import { isAuth } from "../middlewares/authMiddleWare.js";
import { singleUpload } from "../middlewares/multer.js";
import { rateLimit } from "express-rate-limit";

// RATE LIMITER
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
  standardHeaders: "draft-7", // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
  // store: ... , // Use an external store for consistency across multiple server instances.
});

//router obj
const router = express.Router();

//routes
//Register
router.post("/register", limiter, registerController);

//Login
router.post("/login", limiter, loginController);

//PROFILE
router.get("/profile", getUserProfileController);

//LOGOUT
router.get("/logout", logoutController);

// UPDATE PROFILE
router.put("/profile-update", updateProfileController);

// UPDATE PASSWORD
router.put("/update-password", udpatePasswordController);

// update profile pic
router.put("/update-picture", singleUpload, updateProfilePicController);

//FORGOT PASSWORD
router.post("/reset-password", passwordResetController);

//export
export default router;
