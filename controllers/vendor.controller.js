import Vendor from "../models/vendor.model.js";
import User from "../models/user.model.js";
import { deleteFile } from "../utils/delete-file.js";

export async function addVendor(req, res) {
  // const {
  //   companyName,
  //   mobile,
  //   landline,
  //   ifsc,
  //   accountNumber,
  //   startingHour,
  //   endingHour,
  //   expertServices,
  // } = req.body;

  // if (
  //   !companyName ||
  //   !mobile ||
  //   !landline ||
  //   !ifsc ||
  //   !accountNumber ||
  //   !startingHour ||
  //   !endingHour ||
  //   !expertServices
  // ) {
  //   return res.status(400).json({
  //     status: "error",
  //     message:
  //       "required fields: companyName, mobile, landline, ifsc, accountNumber, startingHour, endingHour, expertServices ",
  //   });
  // }

  // const vendorData = {
  //   user: req.user._id,
  //   companyName,
  //   bankInfo: {
  //     ifsc,
  //     accountNumber,
  //   },
  //   workingHours: {
  //     startingHour,
  //     endingHour,
  //   },
  //   mobile,
  //   landline,
  //   expertServices,
  // };
  try {
    const existingVendor = await Vendor.findOne({ user: req.user._id });
    if (existingVendor) {
      return res.status(400).json({
        status: "error",
        message: "Vendor already exists",
      });
    }
    const vendor = await Vendor.create({ user: req.user._id });
    if (!vendor)
      return res.status(500).json({ status: "error", message: err.message });

    // const user = await User.findByIdAndUpdate(
    //   req.user._id,
    //   { usertype: "VENDOR" },
    //   { new: true }
    // );
    return res.status(201).json({ status: "success", vendor });
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
  try {
    const vendor = await Vendor.findOne({ user: req.user._id }).populate(
      "user"
    );
    if (!vendor) {
      return res
        .status(500)
        .json({ status: "error", message: "vendor not found" });
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
    associateName,
    associateAddress,
    associatePermanentAddress,
  } = req.body;

  try {
    const vendor = await Vendor.findOne({
      user: req.user._id,
    });
    console.log(vendor);
    if (!vendor) {
      return res.status(500).json({ status: "error", message: "unauthorised" });
    }

    const vendorData = { ...vendor._doc };
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
    if (associateName) vendorData.associateDetails.name = associateName;
    if (associateAddress)
      vendorData.associateDetails.address = associateAddress;
    if (associatePermanentAddress)
      vendorData.associateDetails.permanentAddress = associatePermanentAddress;

    const updatedVendor = await Vendor.findByIdAndUpdate(
      vendor._id,
      vendorData,
      { new: true }
    );
    if (!updatedVendor) {
      return res
        .status(500)
        .json({ status: "error", message: "invalid user id" });
    }
    res.status(200).json({ status: "success", updatedVendor });
  } catch (err) {
    console.log(err);
    res.status(500).json({ status: "error", message: err.message });
  }
}

export async function uploadDocument(req, res) {
  const { documentName, value } = req.body;
  const filename = req?.file?.filename;
  console.log({ documentName, filename });

  if (documentName === "certificate validitity") {
    if (!value) {
      if (filename) deleteFile(filename);
      return res.status(400).json({
        status: "error",
        message: "required fields: value, documentName",
      });
    }
    const vendor = await Vendor.findOneAndUpdate(
      { user: req.user._id },
      {
        [`documents.practiceCertificateValiditity`]: value,
      }
    );
    if (!vendor) {
      return res
        .status(500)
        .json({ status: "error", message: "Vendor not found" });
    }
    return res.status(200).json({ status: "success", vendor });
  }
  if (!documentName || !filename) {
    if (filename) deleteFile(filename);
    return res.status(400).json({
      status: "error",
      message: "required fields: document, documentName",
    });
  }

  try {
    const vendor = await Vendor.findOneAndUpdate(
      { user: req.user._id },
      {
        [`documents.${documentName}`]: filename,
      },
      {
        new: true,
      }
    );
    if (!vendor) {
      return res
        .status(500)
        .json({ status: "error", message: "Vendor not found" });
    }
    res.status(200).json({ status: "success", vendor });
  } catch (err) {
    console.log(err);
    res.status(500).json({ status: "error", message: err.message });
  }
}

export async function deleteVendor(req, res) {
  const deletedVendor = await Vendor.findOneAndDelete({ user: req.user._id });
  if (!deletedVendor) {
    return res
      .status(500)
      .json({ status: "error", message: "invalid request" });
  }
  res.status(200).json({ status: "success", deletedVendor });
  try {
  } catch (err) {
    console.log(err);
    res.status(500).json({ status: "error", message: err.message });
  }
}
