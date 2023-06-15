import express from "express";
import {
  requestResetPassword,
  resendVerificationEmail,
  resetPassword,
  signInUser,
  signupUser,
  verifyEmail,
} from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/signup", signupUser);
router.post("/signin", signInUser);

router.get("/verify/:verificationId", verifyEmail);
router.get("/send-link/:verificationId", resendVerificationEmail);

router.post("/forgot-password", requestResetPassword);
router.put("/reset-password", resetPassword);

export default router;
