import express from "express";
import {
  addNews,
  deleteNews,
  getAllNews,
  getNewsById,
  updateNews,
} from "../controllers/news.controller.js";

const router = express.Router();

router.post("/", addNews);
router.put("/", updateNews);

router.get("/:newsId", getNewsById);
router.get("/", getAllNews);

router.delete("/:newsId", deleteNews);

export default router;
