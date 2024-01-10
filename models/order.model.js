import mongoose from "mongoose";

const orderServieRequestSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ["FILE", "FILES", "IMAGE", "IMAGES", "TEXT", "NUMBER"],
    required: true,
  },
  id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ServiceRequest",
    required: true,
  },
  value: {
    type: [String],
    required: true,
  },
});

const orderSchema = new mongoose.Schema(
  {
    clientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    serviceName: {
      type: String,
      required: true,
    },
    serviceId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Service",
    },
    status: {
      type: String,
      enum: [
        "ACCEPTED",
        "PENDING",
        "REJECTED",
        "ASSIGNED_TO_VENDOR",
        "COMPLETED_BY_VENDOR",
        "FINAL_COMPLETED",
      ],
      default: "PENDING",
    },
    transaction: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Transaction",
    },
    vendor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    orderServiceRequest: {
      type: [orderServieRequestSchema],
    },
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);
