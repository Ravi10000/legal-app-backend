import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
  {
    message: {
      type: String,
      required: true,
    },
    is_read: {
      type: Boolean,
      default: false,
    },
    user: {
      type: String,
      //   type: mongoose.Schema.Types.ObjectId,
      //   ref: "User",
    },
    order: {
      type: String,
      //   type: mongoose.Schema.Types.ObjectId,
      //   ref: "Order",
    },
    service: {
      type: String,
      //   type: mongoose.Schema.Types.ObjectId,
      //   ref: "Service",
    },
    type: {
      type: String,
      enum: ["Private", "Public"],
      default: "Public",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Notification", notificationSchema);
