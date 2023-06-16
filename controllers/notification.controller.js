import Notification from "../models/notofication.model.js";

export async function addNotification(req, res) {
  const { message, user, order, service, type } = req.body;
  if (
    !message ||
    !user ||
    !order ||
    !service ||
    !(type === "PRIVATE" || type === "PUBLIC")
  ) {
    return res.status(400).json({
      status: "error",
      message:
        "required fields: message, user, order, service, type one or more fields are missing",
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
  try {
    const notifications = await Notification.find();
    return res.status(200).json({ status: "success", notifications });
  } catch (err) {
    console.log(err);
    res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
}

export async function updateNotification(req, res) {
  const { notificationId, is_read, message } = req.body;
  try {
  } catch (err) {
    console.log(err);
    res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
}
