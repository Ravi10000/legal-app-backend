import Service from "../models/service.model.js";

export async function addService(req, res) {
  const {
    title,
    description,
    category,
    marketPrice,
    ourPrice,
    shortDescription, //optional
    childServices, //optional
    parentService, //optional
  } = req.body;

  if (!title || !description || !ourPrice || !marketPrice || !category) {
    res.status(400).json({
      status: "error",
      message:
        "required fields: title, description, ourPrice, marketPrice, category",
    });
  }
  const createdBy = req.user._id;
  const serviceData = {
    title,
    description,
    ourPrice,
    marketPrice,
    category,
    createdBy,
    updatedBy: createdBy,
  };
  if (shortDescription) serviceData.shortDescription = shortDescription;
  if (childServices) serviceData.childServices = childServices;
  if (parentService) serviceData.parentService = parentService;

  console.log({ serviceData });

  try {
    const service = await Service.create(serviceData);
    if (!service) return res.status(400).json({ message: "Invalid Data" });

    return res.status(201).json({
      status: "success",
      message: "Service Added Successfully",
      service,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function getAllServices(req, res) {
  const { status } = req.query;
  const q = {};
  if (status === "activated" || status === "deactivated") {
    q.isDeactivated = status === "deactivated";
  }
  try {
    const services = await Service.find(q);
    if (!services) return res.status(400).json({ message: "Invalid Data" });

    return res.status(200).json({
      status: "success",
      message: "Services fetched successfully",
      services,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function getServiceById(req, res) {
  const { serviceId } = req?.params;
  if (!serviceId) {
    return res
      .status(400)
      .json({ status: "error", message: "serviceId is missing" });
  }
  try {
    const service = await Service.findById(serviceId);
    if (!service) {
      return res.status(404).json({
        status: "error",
        message: "invalid serviceId, service not found",
      });
    }

    return res.status(200).json({ status: "success", service });
  } catch (err) {
    console.log(err);
    res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
}

export async function updateService(req, res) {
  const {
    title,
    description,
    category,
    marketPrice,
    ourPrice,
    shortDescription,
    childServices,
    parentService,
    serviceId,
  } = req.body;

  if (!serviceId) {
    return res
      .status(400)
      .json({ status: "error", message: "serviceId is missing" });
  }

  const updatedBy = req.user._id;

  const serviceData = {
    updatedBy,
  };
  if (title) serviceData.title = title;
  if (description) serviceData.description = description;
  if (category) serviceData.category = category;
  if (marketPrice) serviceData.marketPrice = marketPrice;
  if (ourPrice) serviceData.ourPrice = ourPrice;
  if (shortDescription) serviceData.shortDescription = shortDescription;
  if (childServices) serviceData.childServices = childServices;
  if (parentService) serviceData.parentService = parentService;

  try {
    const service = await Service.findByIdAndUpdate(serviceId, serviceData, {
      new: true,
    });
    if (!service) {
      return res.status(404).json({
        status: "error",
        message: "invalid serviceId, service not found",
      });
    }
    res.status(200).json({
      status: "success",
      message: "Service Updated Successfully",
      service,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
}

export async function deleteService(req, res) {
  const { serviceId } = req.params;
  if (!serviceId) {
    return res
      .status(400)
      .json({ status: "error", message: "serviceId is missing" });
  }
  try {
    const service = await Service.findByIdAndDelete(serviceId);
    if (!service) {
      return res.status(404).json({
        status: "error",
        message: "Invalid Service Id",
      });
    }
    return res.status(200).json({
      status: "success",
      message: "Service Deleted Successfully",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
}
