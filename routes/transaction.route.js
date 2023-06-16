import express from "express";
import {
  deleteTransaction,
  getAllTransactions,
  getTransactionById,
  initiateTransaction,
  updateTransactionDetails,
} from "../controllers/transaction.controller.js";
import { fetchUser, isValidUser } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/", fetchUser, isValidUser, initiateTransaction);
router.put("/", fetchUser, isValidUser, updateTransactionDetails);

router.get("/:transactionId", fetchUser, isValidUser, getTransactionById);
router.get("/", fetchUser, isValidUser, getAllTransactions);

router.delete("/:transactionId", fetchUser, isValidUser, deleteTransaction);
export default router;
