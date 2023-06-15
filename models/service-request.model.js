import mongoose from "mongoose";

const serviceRequestSchema = new mongoose.Schema(
  {
    fieldName: {
      type: String,
      required: true,
    },
    fieldType: {
      type: String,
      enum: ["FILE", "FILES", "IMAGE", "IMAGES", "TEXT", "NUMBER"],
      required: true,
    },
    fieldDescription: {
      type: String,
      required: true,
    },
    service: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Service",
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

export default mongoose.model("ServiceRequest", serviceRequestSchema);
