import express from "express";
import {
  addCategory,
  getAllCategories,
  updateCatgory,
  getCategoryById,
} from "../controllers/category.controller.js";
import upload from "../middlewares/upload.js";

const router = express.Router();

router.post("/", upload.single("icon"), addCategory);
router.put("/", upload.single("icon"), updateCatgory);

router.get("/:categoryId", getCategoryById);
router.get("/", getAllCategories);

export default router;
