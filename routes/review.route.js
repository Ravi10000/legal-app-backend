import express from "express";
import {
  addReview,
  deleteReview,
  getAllReviews,
  getReviewById,
  updateReview,
} from "../controllers/review.controller.js";
import upload from "../middlewares/upload.js";

const router = express.Router();

router.post("/", upload.single("profilePic"), addReview);
router.put("/", upload.single("profilePic"), updateReview);

router.get("/:reviewId", getReviewById);
router.get("/", getAllReviews);

router.delete("/:reviewId", deleteReview);
export default router;
