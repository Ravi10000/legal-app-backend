import express from "express";
import {
  resendVerificationEmail,
  signInUser,
  signupUser,
  verifyEmail,
} from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/signup", signupUser);
router.post("/signin", signInUser);

router.get("/verify/:verificationId", verifyEmail);
router.get("/send-link/:verificationId", resendVerificationEmail);

export default router;
