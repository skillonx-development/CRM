import mongoose from "mongoose";

const schoolSchema = new mongoose.Schema({
  name: { type: String, required: true },
  principal: { type: String, required: true },
  email: { type: String, required: true },
  website: { type: String },
  contact: [{ type: String }],
  address: { type: String },
  stateId: { type: String },
  stateName: { type: String },
  district: { type: String },
});

const School = mongoose.model("School", schoolSchema);
export default School;