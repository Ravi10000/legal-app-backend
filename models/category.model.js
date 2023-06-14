import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    icon_url: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },
    is_deactivated: {
      type: Boolean,
      default: false,
    },
    added_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      //   required: true,
    },
  },
  {
    timestamps: {
      createdAt: "added_at",
    },
  }
);

export default mongoose.model("Category", categorySchema);
