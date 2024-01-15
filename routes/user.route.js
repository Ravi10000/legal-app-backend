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
router.get("/update", (req, res) => res.send("working"));
router.put("/update", fetchUser, isValidUser, updateUserDetails);
// router.put("/udpate", fetchUser, isValidUser, updateUserDetails);
router.get("/me", fetchUser, isValidUser, getUserDetails);
router.get("/:userId", fetchUser, isValidUser, isAdmin, getUserById);
router.get("/", fetchUser, isValidUser, isAdmin, getAllUsers);

router.delete("/:userId", fetchUser, isValidUser, isAdmin, deleteUser);

export default router;
