import mongoose from "mongoose";

const landingBannerSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image_url: {
      type: String,
      required: true,
    },
    btn_text: {
      type: String,
      required: true,
    },
    url_to_load: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("LandingBanner", landingBannerSchema);
