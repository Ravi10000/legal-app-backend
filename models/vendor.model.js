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
  aadhar: String,
  agreement: String,
  googleMap: String,
  nameBoard: String,
  pan: String,
  passPhoto: String,
  powerBill: String,
  practiceCertificate: String,
  practiceCertificateValiditity: Date,
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
    bankInfo: {
      type: bankInfoSchema,
    },
    documents: {
      type: documentSchema,
    },
    associateDetails: {
      type: associateDetailSchema,
    },
    workingHours: {
      type: workingHourSchema,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Vendor", vendorSchema);
