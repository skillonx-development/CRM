import mongoose from "mongoose";

const invoiceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  email: { type: String, required: true },
  amount: { type: Number, required: true },
  status: { type: String, enum: ["Paid", "Awaiting Payment"], default: "Awaiting Payment" },
  issued: { type: String, required: true },
  due: { type: String, required: true }
}, {
  timestamps: true
});

const InvoiceModel = mongoose.model("Invoice", invoiceSchema);
export default InvoiceModel;
