import mongoose from "mongoose";

const passwordChangeRequestSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

export default mongoose.model(
  "PasswordChangeRequest",
  passwordChangeRequestSchema
);
