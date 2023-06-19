import mongoose from "mongoose";

const bankInfoSchema = new mongoose.Schema({
  accountNumber: {
    type: String,
    minLength: 9,
    maxLength: 18,
    required: true,
  },
  ifsc: {
    type: String,
    maxLength: 11,
    minLength: 11,
    required: true,
  },
});

const documentSchema = new mongoose.Schema({
  aadhar: { type: String, default: "" },
  agreement: { type: String, default: "" },
  googleMap: { type: String, default: "" },
  nameBoard: { type: String, default: "" },
  pan: { type: String, default: "" },
  passPhoto: { type: String, default: "" },
  powerBill: { type: String, default: "" },
  practiceCertificate: { type: String, default: "" },
  practiceCertificateValiditity: { type: Date, default: null },
});

const associateDetailSchema = new mongoose.Schema({
  address: String,
  name: String,
  permanentAddress: String,
});
const workingHourSchema = new mongoose.Schema({
  startingHour: { type: Number, required: true },
  endingHour: { type: Number, required: true },
});

const vendorSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    companyName: {
      type: String,
      required: true,
    },
    expertServices: String,
    landline: String,
    mobile: String,
    otherQualificationDegree: String,
    otherQualificationUniversity: String,
    permanentAddress: String,
    practiceExperience: String,
    qualificationDegree: String,
    qualificationUniversity: String,
    yearOfCompletion: Number,
    bankInfo: bankInfoSchema,
    documents: documentSchema,
    associateDetails: associateDetailSchema,
    workingHours: workingHourSchema,
  },
  { timestamps: true }
);

export default mongoose.model("Vendor", vendorSchema);
