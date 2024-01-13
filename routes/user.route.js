import express from "express";
import {
  fetchUser,
  isAdmin,
  isValidUser,
} from "../middlewares/auth.middleware.js";
import {
  getAllUsers,
  getUserDetails,
  getUserById,
  deleteUser,
  updateUserDetails,
} from "../controllers/user.controller.js";

const router = express.Router();

router.get("/me", fetchUser, isValidUser, getUserDetails);
router.get("/:userId", fetchUser, isValidUser, isAdmin, getUserById);
router.get("/", fetchUser, isValidUser, isAdmin, getAllUsers);

router.put("/udpate", fetchUser, isValidUser, updateUserDetails);

router.delete("/:userId", fetchUser, isValidUser, isAdmin, deleteUser);

export default router;
