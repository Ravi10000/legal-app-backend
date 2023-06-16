import express from "express";
import {
  fetchUser,
  isAdmin,
  isValidUser,
} from "../middlewares/auth.middleware.js";
import {
  addVendor,
  getAllVendors,
  getVendorById,
  updateVendorDetails,
} from "../controllers/vendor.controller.js";
import upload from "../middlewares/upload.js";

const router = express.Router();

router.post("/", fetchUser, isValidUser, addVendor);
router.put(
  "/document",
  fetchUser,
  isValidUser,
  upload.single("document"),
  updateVendorDetails
);
router.put("/", fetchUser, isValidUser, updateVendorDetails);

router.get("/:vendorId", fetchUser, isValidUser, getVendorById);
router.get("/", fetchUser, isValidUser, isAdmin, getAllVendors);

export default router;
