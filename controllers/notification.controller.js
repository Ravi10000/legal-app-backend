import Notification from "../models/notofication.model.js";

export async function addNotification(req, res) {
  const { message, user, order, service, type } = req.body;
  if (!message || !user || !order || !service || !type) {
    return res.status(400).json({
      status: "error",
      message:
        "required fields: message, user, order, service, type one or more fields are missing",
    });
  }
  if (type !== "PRIVATE" && type !== "PUBLIC") {
    return res.status(400).json({
      status: "error",
      message: "type must be PRIVATE or PUBLIC",
    });
  }
  try {
    const notification = await Notification.create({
      message,
      user,
      order,
      service,
      type,
    });
    return res.status(201).json({ status: "success", notification });
  } catch (err) {
    console.log(err);
    res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
}

export async function getAllNotifications(req, res) {
  const q = {};
  if (!req.user.isAdmin) {
    q.user = req.user._id;
  }
  try {
    const notifications = await Notification.find(q);
    return res.status(200).json({ status: "success", notifications });
  } catch (err) {
    console.log(err);
    res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
}

export async function updateNotificationStatus(req, res) {
  const { notificationId, isRead } = req.body;
  if (!notificationId || !isRead) {
    return res.status(400).json({
      status: "error",
      message: "required fields: notificationId, isRead",
    });
  }
  if (typeof isRead !== "boolean") {
    return res.status(400).json({
      status: "error",
      message: "isRead must be boolean",
    });
  }
  try {
    const notification = await Notification.findOneAndUpdate(
      { _id: notificationId, user: req.user._id },
      { isRead },
      { new: true }
    );
    if (!notification) {
      return res.status(404).json({
        status: "error",
        message: "invalid notificationId or Unauthorised",
      });
    }
    return res.status(200).json({ status: "success", notification });
  } catch (err) {
    console.log(err);
    res.status(500).json({ status: "error", message: err.message });
  }
}

export async function deleteNotification(req, res) {
  const { notificationId } = req.params;
  if (!notificationId) {
    return res
      .status(400)
      .json({ status: "error", message: "required field: notificationId" });
  }
  const q = { _id: notificationId };
  if (!req.user.isAdmin) {
    q.user = req.user._id;
  }
  try {
    const notification = await Notification.findOneAndDelete(q);
    if (!notification) {
      return res.status(404).json({
        status: "error",
        message: "invalid notificationId or Unauthorised",
      });
    }
    return res.status(200).json({
      status: "success",
      message: "Notification Deleted Successfully",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ status: "error", message: err.message });
  }
}
