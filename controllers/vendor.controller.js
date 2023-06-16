import Vendor from "../models/vendor.model.js";
import User from "../models/user.model.js";

export async function addVendor(req, res) {
  const {
    companyName,
    mobile,
    landline,
    ifsc,
    accountNumber,
    startingHour,
    endingHour,
    expertServices,
  } = req.body;

  if (
    !companyName ||
    !mobile ||
    !landline ||
    !ifsc ||
    !accountNumber ||
    !startingHour ||
    !endingHour ||
    !expertServices
  ) {
    return res.status(400).json({
      status: "error",
      message:
        "required fields: companyName, mobile, landline, ifsc, accountNumber, startingHour, endingHour, expertServices ",
    });
  }

  const vendorData = {
    user: req.user._id,
    companyName,
    bankInfo: {
      ifsc,
      accountNumber,
    },
    workingHours: {
      startingHour,
      endingHour,
    },
    mobile,
    landline,
    expertServices,
  };
  try {
    const vendor = await Vendor.create(vendorData);
    if (!vendor)
      return res.status(500).json({ status: "error", message: err.message });

    const user = await User.findByIdAndUpdate(
      req.user._id,
      { usertype: "VENDOR" },
      { new: true }
    );
    return res.status(201).json({ status: "success", vendor, user });
  } catch (err) {
    console.log(err);
    res.status(500).json({ status: "error", message: err.message });
  }
}

export async function getAllVendors(req, res) {
  try {
    const vendors = await Vendor.find({}).populate("user");
    if (!vendors) {
      return res.status(500).json({ status: "error", message: err.message });
    }
    return res.status(200).json({ status: "success", vendors });
  } catch (err) {
    console.log(err);
    res.status(500).json({ status: "error", message: err.message });
  }
}

export async function getVendorById(req, res) {
  const { vendorId } = req.params;

  if (!vendorId) {
    return res
      .status(400)
      .json({ status: "error", message: "required fields: vendorId" });
  }
  try {
    const vendor = await Vendor.findById(vendorId).populate("user");
    if (!vendor) {
      return res.status(500).json({ status: "error", message: err.message });
    }
    return res.status(200).json({ status: "success", vendor });
  } catch (err) {
    console.log(err);
    res.status(500).json({ status: "error", message: err.message });
  }
}

export async function updateVendorDetails(req, res) {
  const {
    companyName,
    expertServices,
    mobile,
    landline,
    accountNumber,
    ifsc,
    startingHour,
    endingHour,
    qualificationDegree,
    qualificationUniversity,
    yearOfCompletion,
    otherQualificationDegree,
    otherQualificationUniversity,
    permanentAddress,
    practiceExperience,
  } = req.body;

  try {
    const vendor = await Vendor.findOne({ user: req.user._id });
    if (!vendor) {
      return res.status(500).json({ status: "error", message: err.message });
    }
    const vendorData = {};
    if (companyName) vendorData.companyName = companyName;
    if (expertServices) vendorData.expertServices = expertServices;
    if (mobile) vendorData.mobile = mobile;
    if (landline) vendorData.landline = landline;
    if (accountNumber) vendorData.bankInfo.accountNumber = accountNumber;
    if (ifsc) vendorData.bankInfo.ifsc = ifsc;
    if (startingHour) vendorData.workingHours.startingHour = startingHour;
    if (endingHour) vendorData.workingHours.endingHour = endingHour;
    if (qualificationDegree)
      vendorData.qualificationDegree = qualificationDegree;
    if (qualificationUniversity)
      vendorData.qualificationUniversity = qualificationUniversity;
    if (yearOfCompletion) vendorData.yearOfCompletion = yearOfCompletion;
    if (otherQualificationDegree)
      vendorData.otherQualificationDegree = otherQualificationDegree;
    if (otherQualificationUniversity)
      vendorData.otherQualificationUniversity = otherQualificationUniversity;
    if (permanentAddress) vendorData.permanentAddress = permanentAddress;
    if (practiceExperience) vendorData.practiceExperience = practiceExperience;

    const updatedVendor = await Vendor.findByIdAndUpdate(
      vendor._id,
      vendorData,
      { new: true }
    );
    if (!updatedVendor) {
      return res.status(500).json({ status: "error", message: err.message });
    }
    res.status(200).json({ status: "success", updatedVendor });
  } catch (err) {
    console.log(err);
    res.status(500).json({ status: "error", message: err.message });
  }
}

export async function uploadDocument(req, res) {
  const { vendorId } = req.params;
  const { documentType, documentName } = req.body;
  const document = req.file;

  if (!vendorId || !documentType || !documentName || !document) {
    return res
      .status(400)
      .json({
        status: "error",
        message:
          "required fields: vendorId, documentType, documentName, document",
      });
  }

  try {
    const vendor = await Vendor.findById(vendorId);
    if (!vendor) {
      return res.status(500).json({ status: "error", message: err.message });
    }
    const documentData = {
      documentType,
      documentName,
      document: document.path,
    };
    vendor.documents.push(documentData);
    const updatedVendor = await vendor.save();
    if (!updatedVendor) {
      return res.status(500).json({ status: "error", message: err.message });
    }
    res.status(200).json({ status: "success", updatedVendor });
  } catch (err) {
    console.log(err);
    res.status(500).json({ status: "error", message: err.message });
  }
}
