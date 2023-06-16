import mongoose from "mongoose";

const transactionSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    service: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Service",
      required: true,
    },
    status: {
      type: String,
      enum: ["INITIATED", "SUCCESS", "FAILED"],
      default: "INITIATED",
    },
    details: Object,
  },
  { timestamps: true }
);

export default mongoose.model("Transaction", transactionSchema);
