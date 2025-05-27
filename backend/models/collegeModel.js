import mongoose from "mongoose";

const collegeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  principal: { type: String, required: true },
  email: { type: String, required: true },
  website: { type: String },
  type: { type: String, enum: ["engineering", "degree"], required: true },
  tier: { type: String, enum: ["tier1", "tier2", "tier3"], required: true },
  placementOfficer: { type: String },
  placementEmail: { type: String },
  branches: [String],
  contact: [{ type: String }],
  address: { type: String },
  stateId: { type: String },
  stateName: { type: String },
  district: { type: String },
}, {
  timestamps: true // add timestamps for createdAt, updatedAt
});

const College = mongoose.model("College", collegeSchema);
export default College;
