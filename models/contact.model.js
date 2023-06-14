import mongoose from "mongoose";

const contactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    detail: {
      type: String,
      required: true,
    },
    icon_url: {
      type: String,
      required: true,
    },
    added_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    is_deactivated: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Contact", contactSchema);
