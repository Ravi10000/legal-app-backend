import express from "express";
import { fetchUser, isValidUser } from "../middlewares/auth.middleware.js";
import {
  addService,
  deleteService,
  getAllServices,
  getServiceById,
  updateService,
} from "../controllers/service.controller.js";

const router = express.Router();

router.post("/", fetchUser, isValidUser, addService);
router.put("/", fetchUser, isValidUser, updateService);

router.get("/:serviceId", getServiceById);
router.get("/", getAllServices);

router.delete("/:serviceId", fetchUser, isValidUser, deleteService);
export default router;
