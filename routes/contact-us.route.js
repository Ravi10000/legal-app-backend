import express from "express";
import {
  addContactUs,
  deleteContactUs,
  getAllContactUs,
  getContactUsById,
  updateContactUs,
} from "../controllers/contact-us.controller.js";

const router = express.Router();

router.post("/", addContactUs);
router.put("/", updateContactUs);

router.get("/:contactUsId", getContactUsById);
router.get("/", getAllContactUs);

router.delete("/:contactUsId", deleteContactUs);
export default router;
