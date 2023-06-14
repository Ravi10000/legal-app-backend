import mongoose from "mongoose";

const newsSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: {
      createdAt: "added_at",
    },
  }
);

export default mongoose.model("News", newsSchema);
