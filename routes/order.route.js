import express from "express";
import {
  checkIfAdmin,
  fetchUser,
  isAdmin,
  isValidUser,
} from "../middlewares/auth.middleware.js";
import {
  addDocument,
  addDocumentFile,
  addOrder,
  deleteOrder,
  getAllOrders,
  getOrderById,
  updateOrderStatus,
} from "../controllers/order.controller.js";
import upload from "../middlewares/upload.js";

const router = express.Router();

router.post("/", fetchUser, isValidUser, addOrder);

router.put(
  "/document/files",
  fetchUser,
  isValidUser,
  upload.array("documents"),
  addDocumentFile
);
router.put("/document", fetchUser, isValidUser, addDocument);
router.put("/status", fetchUser, isValidUser, isAdmin, updateOrderStatus);

router.get("/:orderId", fetchUser, isValidUser, checkIfAdmin, getOrderById);
router.get("/", fetchUser, isValidUser, checkIfAdmin, getAllOrders);

router.delete("/:orderId", fetchUser, isValidUser, isAdmin, deleteOrder);
export default router;
