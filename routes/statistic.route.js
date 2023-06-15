import express from "express";
import { fetchUser, isValidUser } from "../middlewares/auth.middleware.js";
import {
  addStatistic,
  deleteStatistic,
  getAllStatistics,
  getStatisticById,
  updateStatistic,
} from "../controllers/statistic.controller.js";

const router = express.Router();

router.post("/", fetchUser, isValidUser, addStatistic);
router.put("/", fetchUser, isValidUser, updateStatistic);

router.get("/:statisticId", getStatisticById);
router.get("/", getAllStatistics);

router.delete("/:statisticId", deleteStatistic);

export default router;
