import ContactUs from "../models/contact-us.model.js";

export async function addContactUs(req, res) {
  const { companyName, email, firstName, lastName, mobileNumber, notes } =
    req?.body;

  if (!companyName || !email || !firstName || !lastName || !mobileNumber) {
    return res.status(400).json({
      message:
        "required fields: companyName, email, firstName, lastName, mobileNumber, One of more fields are missing",
    });
  }
  const contactUsData = {
    companyName,
    email,
    firstName,
    lastName,
    mobileNumber,
  };
  if (notes) contactUsData.notes = notes;
  try {
    const contactUs = await ContactUs.create(contactUsData);
    return res.status(201).json({ status: "success", contactUs });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "internal server error" });
  }
}

export async function getAllContactUs(req, res) {
  try {
    const contactUs = await ContactUs.find();
    return res.status(200).json({ status: "success", contactUs });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "internal server error" });
  }
}

export async function getContactUsById(req, res) {
  const contactUsId = req?.params?.contactUsId;
  if (!contactUsId) {
    return res.status(400).json({ message: "contactUsId is missing" });
  }
  try {
    const contactUs = await ContactUs.findById(contactUsId);
    if (!contactUs) {
      return res
        .status(404)
        .json({ message: "invalid contactUsId, contactUs not found" });
    }
    return res.status(200).json({ status: "success", contactUs });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "internal server error" });
  }
}

export async function updateContactUs(req, res) {
  const {
    companyName,
    email,
    firstName,
    lastName,
    mobileNumber,
    notes,
    contactUsId,
  } = req?.body;

  if (!contactUsId) {
    return res.status(400).json({ message: "contactUsId is missing" });
  }
  const contactUsData = {};
  if (companyName) contactUsData.companyName = companyName;
  if (email) contactUsData.email = email;
  if (firstName) contactUsData.firstName = firstName;
  if (lastName) contactUsData.lastName = lastName;
  if (mobileNumber) contactUsData.mobileNumber = mobileNumber;
  if (notes) contactUsData.notes = notes;

  try {
    const contactUs = await ContactUs.findById(contactUsId);
    if (!contactUs) {
      return res
        .status(404)
        .json({ message: "invalid contactUsId, contactUs not found" });
    }

    const updatedContactUs = await ContactUs.findByIdAndUpdate(
      contactUsId,
      contactUsData,
      { new: true }
    );

    return res
      .status(200)
      .json({ status: "success", contactUs: updatedContactUs });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "internal server error" });
  }
}

export async function deleteContactUs(req, res) {
  const contactUsId = req?.params?.contactUsId;
  if (!contactUsId) {
    return res.status(400).json({ message: "contactUsId is missing" });
  }
  try {
    const contactUs = await ContactUs.findByIdAndDelete(contactUsId);
    if (!contactUs) {
      return res
        .status(404)
        .json({ message: "invalid contactUsId, contactUs not found" });
    }
    return res
      .status(200)
      .json({ status: "success", message: "Contact Us Deleted Successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "internal server error" });
  }
}
