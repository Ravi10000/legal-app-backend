import Review from "../models/review.model.js";
import { deleteFile } from "../utils/delete-file.js";

export async function addReview(req, res) {
  const { name, title, designation, review } = req.body;
  const filename = req?.file?.filename;
  if (!filename || !name || !title || !designation || !review) {
    if (filename) deleteFile(filename);
    return res.status(400).json({
      success: "error",
      message:
        "required field : name, title, designation, review, profilePic, one or more missing fields",
    });
  }

  try {
    const newReview = await Review.create({
      name,
      title,
      designation,
      review,
      customerProfilePic: filename,
    });
    res.status(201).json({
      success: "success",
      message: "Review added successfully",
      review: newReview,
    });
  } catch (err) {
    console.log(err);
    res.status(500),
      json({
        success: "error",
        message: "Internal Server Error",
      });
  }
}

export async function getAllReviews(req, res) {
  try {
    const reviews = await Review.find();
    res.status(200).json({
      success: "success",
      message: "All Reviews",
      reviews,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: "error",
      message: "Internal Server Error",
    });
  }
}

export async function getReviewById(req, res) {
  const { reviewId } = req.params;
  if (!reviewId)
    return res
      .status(400)
      .json({ success: "error", message: "reviewId is required" });
  try {
    const review = await Review.findById(reviewId);
    if (!review) {
      return res.status(404).json({
        success: "error",
        message: "Review not found",
      });
    }
    res.status(200).json({
      success: "success",
      message: "Review",
      review,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: "error",
      message: "Internal Server Error",
    });
  }
}

export async function deleteReview(req, res) {
  const { reviewId } = req.params;
  if (!reviewId) {
    return res.status(400).json({
      success: "error",
      message: "reviewId is required",
    });
  }
  try {
    const review = await Review.findByIdAndDelete(reviewId);
    if (!review) {
      return res.status(404).json({
        success: "error",
        message: "Review not found",
      });
    }
    res.status(200).json({
      success: "success",
      message: "Review Deleted Successfully",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: "error",
      message: "Internal Server Error",
    });
  }
}

export async function updateReview(req, res) {
  const { name, title, designation, review, reviewId } = req.body;
  const filename = req?.file?.filename;
  if (!reviewId) {
    if (filename) deleteFile(filename);
    return res.status(400).json({
      success: "error",
      message: "required field : reviewId",
    });
  }
  const reviewData = {};
  if (name) reviewData.name = name;
  if (title) reviewData.title = title;
  if (designation) reviewData.designation = designation;
  if (review) reviewData.review = review;
  if (filename) reviewData.customerProfilePic = filename;

  try {
    const oldReview = await Review.findById(reviewId);
    if (!oldReview) {
      if (filename) deleteFile(filename);
      return res.status(404).json({
        success: "error",
        message: "Review not found",
      });
    }

    const newReview = await Review.findByIdAndUpdate(reviewId, reviewData, {
      new: true,
    });
    deleteFile(oldReview.customerProfilePic);
    res.status(201).json({
      success: "success",
      message: "Review added successfully",
      review: newReview,
    });
  } catch (err) {
    console.log(err);
    res.status(500),
      json({
        success: "error",
        message: "Internal Server Error",
      });
  }
}
