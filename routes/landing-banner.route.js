import express from "express";
import {
  addLandingBanner,
  deleteLandingBanner,
  getAllLandingBanners,
  getLandinBannerById,
  updateLandingBanner,
} from "../controllers/landing-banner.controller.js";
import upload from "../middlewares/upload.js";

const router = express.Router();

router.post("/", upload.single("image"), addLandingBanner);
router.put("/", upload.single("image"), updateLandingBanner);

router.get("/:landingBannerId", getLandinBannerById);
router.get("/", getAllLandingBanners);

router.delete("/:landingBannerId", deleteLandingBanner);

export default router;
