import mongoose from "mongoose";

const proposalSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["Lead Acquired", "Proposal Sent", "Accepted", "Rejected"],
      default: "Lead Acquired",
    },
    institution: {
      type: String,
      required: true,
      trim: true,
    },
    scheduleDate: {
      type: Date,
      required: true,
    },
    description: {
      type: String,
      trim: true,
    },
    collegeEmail:{
      type:String,
      requuired:true
    }
  },
  { timestamps: true }
);

const Proposal = mongoose.model("Proposal", proposalSchema);

export default Proposal;
