import mongoose from "mongoose";

// Define timeline schema
const timelineSchema = new mongoose.Schema({
  step: String,
  date: String,
  description: String,
});

// Define the main tech proposals schema
const techProposalsSchema = new mongoose.Schema(
  {
    institution: String,
    title: String,
    price: Number,
    collegeEmail:String,
    scheduledDate: String,
    scheduledTime: String,
    selectedTeacher: String,
    selectedVideo: String,
    selectedPDF: String,
    draft: String,
    timeline: [timelineSchema],
    uploadedFileName: String,
    sent: {
      type: Boolean,
      default: false,
    },
    mou: {
      type: String,
    },
    status: {
      type: String,
      enum: ["Pending", "Sent", "Accepted", "Rejected"],
      default: "Pending"
    }
  },
  {
    timestamps: true,
  }
);

// Prevent OverwriteModelError
const TechProposalsModel =
  mongoose.models.TechProposalsModel ||
  mongoose.model("TechProposalsModel", techProposalsSchema);

export default TechProposalsModel;
