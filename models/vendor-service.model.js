import mongoose from "mongoose";

const vendorServiceSchema = new mongoose.Schema({
  services: {
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Service",
      },
    ],
  },
  vendor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Vendor",
  },
});

export default mongoose.model("VendorService", vendorServiceSchema);
