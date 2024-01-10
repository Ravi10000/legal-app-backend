import mongoose from "mongoose";

const bankInfoSchema = new mongoose.Schema({
  accountNumber: {
    type: String,
    default: "NOT AVAILABLE",
  },
  ifsc: {
    type: String,
    default: "NOT AVAILABLE",
  },
});

const documentSchema = new mongoose.Schema({
  aadhar: { type: String, default: "NOT AVAILABLE" },
  agreement: { type: String, default: "NOT AVAILABLE" },
  googleMap: { type: String, default: "NOT AVAILABLE" },
  nameBoard: { type: String, default: "NOT AVAILABLE" },
  pan: { type: String, default: "NOT AVAILABLE" },
  passPhoto: { type: String, default: "NOT AVAILABLE" },
  powerBill: { type: String, default: "NOT AVAILABLE" },
  practiceCertificate: { type: String, default: "NOT AVAILABLE" },
  profilePic: { type: String, default: "NOT AVAILABLE" },
  practiceCertificateValiditity: {
    type: Date,
    default: "1970-01-01T00:00:00.000Z",
  },
});

const associateDetailSchema = new mongoose.Schema({
  address: {
    type: String,
    default: "NOT AVAILABLE",
  },
  name: {
    type: String,
    default: "NOT AVAILABLE",
  },
  permanentAddress: {
    type: String,
    default: "NOT AVAILABLE",
  },
});

const workingHourSchema = new mongoose.Schema({
  startingHour: { type: String, default: -1 },
  endingHour: { type: String, default: -1 },
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
      default: "NOT AVAILABLE",
    },
    expertServices: {
      type: String,
      default: "NOT AVAILABLE",
    },
    landline: {
      type: String,
      default: "NOT AVAILABLE",
    },
    mobile: {
      type: String,
      default: "NOT AVAILABLE",
    },
    otherQualificationDegree: {
      type: String,
      default: "NOT AVAILABLE",
    },
    otherQualificationUniversity: {
      type: String,
      default: "NOT AVAILABLE",
    },
    permanentAddress: {
      type: String,
      default: "NOT AVAILABLE",
    },
    practiceExperience: {
      type: String,
      default: "NOT AVAILABLE",
    },
    qualificationDegree: {
      type: String,
      default: "NOT AVAILABLE",
    },
    qualificationUniversity: {
      type: String,
      default: "NOT AVAILABLE",
    },
    yearOfCompletion: {
      type: Number,
      default: -1,
    },
    bankInfo: {
      type: bankInfoSchema,
      default: { ifsc: "NOT AVAILABLE", accountNumber: "NOT AVAILABLE" },
    },
    documents: {
      type: documentSchema,
      default: {
        aadhar: "NOT AVAILABLE",
        agreement: "NOT AVAILABLE",
        googleMap: "NOT AVAILABLE",
        nameBoard: "NOT AVAILABLE",
        pan: "NOT AVAILABLE",
        passPhoto: "NOT AVAILABLE",
        powerBill: "NOT AVAILABLE",
        practiceCertificate: "NOT AVAILABLE",
        profilePic: "NOT AVAILABLE",
        practiceCertificateValiditity: "1970-01-01T00:00:00.000Z",
      },
    },
    associateDetails: {
      type: associateDetailSchema,
      default: {
        name: "NOT AVAILABLE",
        address: "NOT AVAILABLE",
        permanentAddress: "NOT AVAILABLE",
      },
    },
    workingHours: {
      type: workingHourSchema,
      default: { startingHour: -1, endingHour: -1 },
    },
  },
  { timestamps: true }
);

export default mongoose.model("Vendor", vendorSchema);
