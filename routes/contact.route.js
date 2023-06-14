import express from "express";
import {
  addContact,
  deleteContact,
  getAllContacts,
  getContactById,
  updateContact,
} from "../controllers/contact.controller.js";
import upload from "../middlewares/upload.js";

const router = express.Router();

router.post("/", upload.single("icon"), addContact);
router.put("/", upload.single("icon"), updateContact);

router.get("/:contactId", getContactById);
router.get("/", getAllContacts);

router.delete("/:contactId", deleteContact);
export default router;
