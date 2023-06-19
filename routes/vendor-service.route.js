import express from "express";
import { fetchUser, isValidUser } from "../middlewares/auth.middleware.js";
import {
  addVendorService,
  deleteVendorServices,
  getAllVendorServices,
  updateVendorServices,
} from "../controllers/vendor-service.controller.js";

const router = express.Router();

router.post("/", fetchUser, isValidUser, addVendorService);
router.put("/", fetchUser, isValidUser, updateVendorServices);

router.get("/", fetchUser, isValidUser, getAllVendorServices);
router.delete(
  "/:vendorServiceId",
  fetchUser,
  isValidUser,
  deleteVendorServices
);

export default router;
