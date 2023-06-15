import mongoose from "mongoose";

const UserSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    hash: {
      type: String,
      required: true,
    },
    isDeactivated: {
      type: Boolean,
      default: false,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    usertype: {
      type: String,
      enum: ["ADMIN", "VENDOR", "USER", "EXECUTIVE"],
      default: "USER",
    },
    name: String,
    phoneNumber: String,
    profilePic: String,
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", UserSchema);
