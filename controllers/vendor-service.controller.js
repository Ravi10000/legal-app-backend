import VendorService from "../models/vendor-service.model.js";
import Vendor from "../models/vendor.model.js";

export async function addVendorService(req, res) {
  const { services = [] } = req.body;
  // if (!services) {
  //   return res.status(400).json({ message: "Services are required" });
  // }
  try {
    const vendor = await Vendor.findOne({ user: req.user._id });
    if (!vendor) {
      return res
        .status(404)
        .json({ status: "error", message: "Vendor not found" });
    }
    let vendorService = await VendorService.findOne({ vendor: vendor._id });
    if (!vendorService) {
      vendorService = await VendorService.create({
        services,
        vendor,
      });
    } else {
      vendorService.services = services;
      vendorService = await vendorService.save();
    }
    res.status(201).json({
      status: "success",
      message: "Vendor service added successfully",
      vendorService,
    });
    // const vendorService = await VendorService.create({
    //   services,
    //   vendor,
    // });
    // if (!vendorService) {
    //   return res
    //     .status(500)
    //     .json({ status: "error", message: "invalid request" });
    // }
    // res.status(201).json({
    //   status: "success",
    //   message: "Vendor service added successfully",
    //   vendorService,
    // });
  } catch (err) {
    console.log(err);
    res.status(500).json({ status: "error", message: err.message });
  }
}

export async function getAllVendorServices(req, res) {
  console.log(req.body);
  console.log(req?.user);
  try {
    const vendor = await Vendor.findOne({ user: req.user._id });
    if (!vendor) {
      return res
        .status(404)
        .json({ status: "error", message: "Vendor not found" });
    }
    const vendorServices = await VendorService.find({ vendor: vendor._id });
    if (!vendorServices) {
      return res
        .status(500)
        .json({ status: "error", message: "invalid request" });
    }
    res.status(200).json({
      status: "success",
      message: "Vendor services fetched successfully",
      vendorServices,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ status: "error", message: err.message });
  }
}

export async function updateVendorServices(req, res) {
  const { services, vendorServiceId } = req.body;
  if ((!services, !vendorServiceId)) {
    return res.status(400).json({
      status: "error",
      message: "Services, vendorServiceId are required",
    });
  }
  try {
    const vendor = await Vendor.findOne({ user: req.user._id });
    if (!vendor) {
      return res
        .status(404)
        .json({ status: "error", message: "Vendor not found" });
    }
    const vendorService = await VendorService.findOne({
      _id: vendorServiceId,
    });
    if (!vendorService) {
      return res
        .status(404)
        .json({ status: "error", message: "Vendor service not found" });
    }
    vendorService.services = services;
  } catch (err) {
    console.log(err);
    res.status(500).json({ status: "error", message: err.message });
  }
}

export async function deleteVendorServices(req, res) {
  const { vendorServiceId } = req.params;
  if (!vendorServiceId) {
    return res.status(400).json({
      status: "error",
      message: "vendorServiceId is required",
    });
  }
  try {
    const vendor = await Vendor.findOneAndDelete({
      user: req.user._id,
      _id: vendorServiceId,
    });
    if (!vendor) {
      return res.status(404).json({
        status: "error",
        message: "Vendor Service not found or unauthorized",
      });
    }
    res.status(200).json({
      status: "success",
      message: "Vendor Service deleted successfully",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ status: "error", message: err.message });
  }
}
