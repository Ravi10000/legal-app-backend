import Contact from "../models/contact.model.js";
import { deleteFile } from "../utils/delete-file.js";

export async function addContact(req, res) {
  const { name, detail, description, is_deactivated } = req?.body;
  const filename = req?.file?.filename;

  if (!name || !detail || !description || !filename) {
    if (filename) deleteFile(filename);
    return res.status(400).json({
      message:
        "required fields: name, detail, description, icon, One of more fields are missing",
    });
  }
  const contactData = {
    name,
    detail,
    description,
    icon_url: filename,
  };
  if (is_deactivated === "true") contactData.is_deactivated = true;
  try {
    const contact = await Contact.create(contactData);
    return res.status(201).json({ status: "success", contact });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "internal server error" });
  }
}

export async function getContactById(req, res) {
  const { contactId } = req?.params;
  if (!contactId) {
    return res.status(400).json({ message: "contactId is missing" });
  }

  try {
    const contact = await Contact.findById(contactId);
    if (!contact) {
      return res
        .status(404)
        .json({ message: "invalid contactId, contact not found" });
    }
    return res.status(200).json({ status: "success", contact });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "internal server error" });
  }
}

export async function getAllContacts(req, res) {
  try {
    const contacts = await Contact.find();
    return res.status(200).json({ status: "success", contacts });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "internal server error" });
  }
}

export async function updateContact(req, res) {
  const { name, detail, description, is_deactivated, contactId } = req?.body;
  const filename = req?.file?.filename;

  if (!contactId) {
    if (filename) deleteFile(filename);
    return res.status(400).json({
      message: "contactId missing",
    });
  }
  const contactData = {};
  if (name) contactData.name = name;
  if (detail) contactData.detail = detail;
  if (description) contactData.description = description;
  if (filename) contactData.icon_url = filename;

  if (is_deactivated === "true") contactData.is_deactivated = true;
  else if (is_deactivated === "false") contactData.is_deactivated = false;

  try {
    const contact = await Contact.findById(contactId);
    if (!contact) {
      if (filename) deleteFile(filename);
      return res
        .status(404)
        .json({ message: "invalid contactId, contact not found" });
    }
    const updatedContact = await Contact.findByIdAndUpdate(
      contactId,
      contactData,
      { new: true }
    );

    return res.status(201).json({ status: "success", contact: updatedContact });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "internal server error" });
  }
}
