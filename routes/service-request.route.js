import express from "express";
import { fetchUser, isValidUser } from "../middlewares/auth.middleware.js";
import {
  addServiceRequest,
  deleteServiceRequest,
  getAllServiceRequests,
  getServiceRequestById,
  updateServiceRequest,
} from "../controllers/service-request.controller.js";

const router = express.Router();

router.post("/", fetchUser, isValidUser, addServiceRequest);
router.put("/", fetchUser, isValidUser, updateServiceRequest);

router.get("/:serviceRequestId", getServiceRequestById);
router.get("/", getAllServiceRequests);

router.delete("/:serviceRequestId", deleteServiceRequest);
export default router;
