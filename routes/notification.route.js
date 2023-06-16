import express from "express";
import {
  addNotification,
  getAllNotifications,
  updateNotificationStatus,
  deleteNotification,
} from "../controllers/notification.controller.js";
import {
  checkIfAdmin,
  fetchUser,
  isValidUser,
} from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/", fetchUser, isValidUser, addNotification);
router.put("/", fetchUser, isValidUser, updateNotificationStatus);

router.get("/", fetchUser, isValidUser, checkIfAdmin, getAllNotifications);

router.delete(
  "/:notificationId",
  fetchUser,
  isValidUser,
  checkIfAdmin,
  deleteNotification
);

export default router;
