import ServiceRequest from "../models/service-request.model.js";

export async function addServiceRequest(req, res) {
  const { fieldName, fieldType, fieldDescription, service } = req.body;
  if (!fieldName || !fieldType || !fieldDescription || !service) {
    return res.status(400).json({
      success: "error",
      message:
        "required field :fieldName, fieldType, fieldDescription, service, one or more missing fields",
    });
  }
  const validFieldTypes = [
    "FILE",
    "FILES",
    "IMAGE",
    "IMAGES",
    "TEXT",
    "NUMBER",
  ];
  if (!validFieldTypes.includes(fieldType)) {
    return res.status(400).json({
      success: "error",
      message: "fieldType must be one of " + validFieldTypes.join(", "),
    });
  }

  try {
    const serviceRequest = await ServiceRequest.create({
      fieldName,
      fieldType,
      fieldDescription,
      service,
      createdBy: req.user._id,
    });
    res.status(201).json({
      success: "success",
      message: "Service Request added successfully",
      review: serviceRequest,
    });
  } catch (err) {
    console.log(err);
    res.status(500),
      json({
        success: "error",
        message: "Internal Server Error",
      });
  }
}

export async function getAllServiceRequests(req, res) {
  try {
    const serviceRequests = await ServiceRequest.find();
    res.status(200).json({
      success: "success",
      message: "All Services Requests Sent",
      serviceRequests,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: "error",
      message: "Internal Server Error",
    });
  }
}

export async function getServiceRequestById(req, res) {
  const { serviceRequestId } = req.params;
  if (!serviceRequestId)
    return res
      .status(400)
      .json({ success: "error", message: "serviceRequestId is required" });
  try {
    const serviceRequest = await ServiceRequest.findById(serviceRequestId);
    if (!serviceRequest) {
      return res.status(404).json({
        success: "error",
        message: "Service Request not found",
      });
    }
    res.status(200).json({
      success: "success",
      message: "Service Request Sent",
      serviceRequest,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: "error",
      message: "Internal Server Error",
    });
  }
}

export async function deleteServiceRequest(req, res) {
  const { serviceRequestId } = req.params;
  if (!serviceRequestId)
    return res
      .status(400)
      .json({ success: "error", message: "serviceRequestId is required" });
  try {
    const serviceRequest = await ServiceRequest.findByIdAndDelete(
      serviceRequestId
    );
    if (!serviceRequest) {
      return res.status(404).json({
        success: "error",
        message: "Service Request not found",
      });
    }
    res.status(200).json({
      success: "success",
      message: "Service Request Deleted Successfully",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: "error",
      message: "Internal Server Error",
    });
  }
}

export async function updateServiceRequest(req, res) {
  const { fieldName, fieldType, fieldDescription, service, serviceRequestId } =
    req.body;
  if (!serviceRequestId) {
    return res.status(400).json({
      success: "error",
      message: "required: serviceRequestId",
    });
  }
  const validFieldTypes = [
    "FILE",
    "FILES",
    "IMAGE",
    "IMAGES",
    "TEXT",
    "NUMBER",
  ];
  if (fieldType && !validFieldTypes.includes(fieldType)) {
    return res.status(400).json({
      success: "error",
      message: "fieldType must be one of " + validFieldTypes.join(", "),
    });
  }
  const serviceData = {
    updatedBy: req.user._id,
  };
  if (fieldName) serviceData.fieldName = fieldName;
  if (fieldType) serviceData.fieldType = fieldType;
  if (fieldDescription) serviceData.fieldDescription = fieldDescription;
  if (service) serviceData.service = service;

  try {
    const serviceRequest = await ServiceRequest.findByIdAndUpdate(
      serviceRequestId,
      serviceData,
      { new: true }
    );
    res.status(201).json({
      success: "success",
      message: "Service Request updated successfully",
      review: serviceRequest,
    });
  } catch (err) {
    console.log(err);
    res.status(500),
      json({
        success: "error",
        message: "Internal Server Error",
      });
  }
}
