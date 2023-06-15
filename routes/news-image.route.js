import express from "express";

import { fetchUser, isValidUser } from "../middlewares/auth.middleware.js";
import {
  addNewsImage,
  deleteNewsImage,
  getAllNewsImages,
  getNewsImageById,
  updateNewsImage,
} from "../controllers/news-image.controller.js";
import upload from "../middlewares/upload.js";

const router = express.Router();

router.post("/", fetchUser, isValidUser, upload.single("image"), addNewsImage);
router.put(
  "/",
  fetchUser,
  isValidUser,
  upload.single("image"),
  updateNewsImage
);

router.get("/", getAllNewsImages);
router.get("/:newsImageId", getNewsImageById);

router.delete("/:newsImageId", fetchUser, isValidUser, deleteNewsImage);

export default router;
