import express from "express";
import {
  addLandingBanner,
  getAllLandingBanners,
  getLandinBannerById,
} from "../controllers/landing-banner.controller.js";
import upload from "../middlewares/upload.js";

const router = express.Router();

router.post("/", upload.single("image"), addLandingBanner);

router.get("/:landingBannerId", getLandinBannerById);
router.get("/", getAllLandingBanners);

export default router;
