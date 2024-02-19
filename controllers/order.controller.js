import Order from "../models/order.model.js";
import ServiceRequest from "../models/service-request.model.js";
import Service from "../models/service.model.js";
import User from "../models/user.model.js";
import Transaction from "../models/transaction.model.js";
import { deleteFile } from "../utils/delete-file.js";

export async function addOrder(req, res) {
  const { serviceId, transactionId, vendorId } = req.body;
  if (!serviceId || !transactionId) {
    return res.status(400).json({
      status: "error",
      message: "required fields: serviceId, and transactionId ",
    });
  }
  try {
    const service = await Service.findById(serviceId);
    if (!service) {
      return res
        .status(400)
        .json({ status: "error", message: "Invalid serviceId" });
    }

    const transaction = await Transaction.findById(transactionId);
    if (!transaction) {
      return res
        .status(400)
        .json({ status: "error", message: "Invalid transaction id" });
    }

    const body = {
      clientId: req.user._id,
      serviceName: service.title,
      serviceId: service._id,
      transaction: transaction._id,
    };
    if (vendorId) {
      const vendor = await User.findById(vendorId);

      if (!vendor) {
        // alos check if found user(vendor)'s usertype in VENDOR
        return res
          .status(400)
          .json({ status: "error", message: "Invalid vendor id" });
      }
      body.vendor = vendor._id;
    }
    const order = await Order.create(body);
    res
      .status(201)
      .json({ status: "success", message: "Order Place Successfully", order });
  } catch (err) {
    console.log(err);
    res.status(500).json({ status: "error", message: err.message });
  }
}

export async function addDocument(req, res) {
  console.log(req.body);
  const { serviceRequestId, orderId, value } = req.body;
  if (!serviceRequestId || !orderId || !value) {
    return res.status(400).json({
      status: "error",
      message: "required fields: serviceRequestId, orderId, value ",
    });
  }

  if (!serviceRequestId) {
    return res.status(400).json({
      status: "error",
      message: "required fields: serviceRequestId ",
    });
  }
  try {
    const serviceRequest = await ServiceRequest.findById(serviceRequestId);
    if (!serviceRequest) {
      return res
        .status(400)
        .json({ status: "error", message: "Invalid serviceRequestId" });
    }

    const orderServiceRequestData = {
      id: serviceRequest._id,
      name: serviceRequest.fieldName,
      type: serviceRequest.fieldType,
      value: [value],
    };
    const order = await Order.findOne({ _id: orderId, clientId: req.user._id });
    if (!order) {
      return res.status(400).json({
        status: "error",
        message: "Invalid orderId or Unauthorised request",
      });
    }
    order.orderServiceRequest.push(orderServiceRequestData);
    await order.save();
    res.status(201).json({
      status: "success",
      message: "Document File Added Successfully",
      order,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ status: "error", message: err.message });
  }
}

export async function addDocumentFile(req, res) {
  const { serviceRequestId, orderId } = req.body;
  const filenames = req?.files && req?.files.map((file) => file.filename);
  if (!serviceRequestId || !filenames || !orderId) {
    if (filenames?.length > 0)
      filenames.forEach((filename) => deleteFile(filename));
    return res.status(400).json({
      status: "error",
      message: "required fields: serviceRequestId, documents, orderId ",
    });
  }

  if (!serviceRequestId) {
    return res.status(400).json({
      status: "error",
      message: "required fields: serviceRequestId ",
    });
  }
  try {
    const serviceRequest = await ServiceRequest.findById(serviceRequestId);
    if (!serviceRequest) {
      return res
        .status(400)
        .json({ status: "error", message: "Invalid serviceRequestId" });
    }

    const orderServiceRequestData = {
      id: serviceRequest._id,
      name: serviceRequest.fieldName,
      type: serviceRequest.fieldType,
      value: filenames,
    };
    const order = await Order.findOne({ _id: orderId, clientId: req.user._id });
    if (!order) {
      return res.status(400).json({
        status: "error",
        message: "Invalid orderId or Unauthorised request",
      });
    }
    order.orderServiceRequest.push(orderServiceRequestData);
    await order.save();
    res.status(201).json({
      status: "success",
      message: "Document File Added Successfully",
      order,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ status: "error", message: err.message });
  }
}

export async function getAllOrders(req, res) {
  const q = req.user.isAdmin ? {} : { clientId: req.user._id };
  try {
    const orders = await Order.find(q);
    res.status(200).json({ status: "success", orders });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
}

export async function getOrderById(req, res) {
  const { orderId } = req.params;
  const q = { _id: orderId };

  if (!orderId) {
    return res.status(400).json({
      status: "error",
      message: "required fields: orderId",
    });
  }
  if (!req.user.isAdmin) {
    q.clientId = req.user._id;
  }

  try {
    const order = await Order.findOne(q);
    if (!order) {
      return res.status(400).json({
        status: "error",
        message: "Invalid orderId or Unauthorised request",
      });
    }
    res.status(200).json({ status: "success", order });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
}

export async function deleteOrder(req, res) {
  const { orderId } = req.params;
  if (!orderId) {
    return res.status(400).json({
      status: "error",
      message: "required fields: orderId",
    });
  }
  try {
    const order = await Order.findByIdAndDelete(orderId);
    if (!order) {
      return res.status(400).json({
        status: "error",
        message: "Invalid orderId or Unauthorised request",
      });
    }
    res
      .status(200)
      .json({ status: "success", message: "Order Deleted Successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
}

export async function updateOrderStatus(req, res) {
  console.log(req.body);
  const { orderId, status } = req.body;
  if (!orderId || !status) {
    return res.status(400).json({
      status: "error",
      message: "required fields: orderId, status",
    });
  }
  const validOrderStaus = [
    "REJECTED",
    "ASSIGNED_TO_VENDOR",
    "COMPLETED_BY_VENDOR",
    "FINAL_COMPLETED",
  ];
  if (!validOrderStaus.includes(status)) {
    return res.status(400).json({
      status: "error",
      message: "Invalid status",
    });
  }
  try {
    const order = await Order.findByIdAndUpdate(
      { _id: orderId },
      { status },
      { new: true }
    );
    if (!order) {
      return res.status(400).json({
        status: "error",
        message: "Invalid orderId or Unauthorised request",
      });
    }
    res.status(200).json({
      status: "success",
      message: "Order Status Updated Successfully",
      order,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
}
