import InvoiceModel from "../models/invoiceModel.js";
import { sendEmail } from "../utils/sendEmail.js";
// Create a new invoice
export const createInvoice = async (req, res) => {
  try {
    const { title, email, amount, issued, due, status } = req.body;

    if (!title || !email || !amount || !issued || !due) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // Simple email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email address." });
    }

    const count = await InvoiceModel.countDocuments();
    const newId = `INV-${new Date().getFullYear()}-${String(count + 1).padStart(3, '0')}`;

    const newInvoice = new InvoiceModel({
      id: newId,
      title,
      email,
      amount,
      issued,
      due,
      status: status || "Awaiting Payment"
    });

    await newInvoice.save();
    res.status(201).json({
        status: 'success',
        message: 'Invoice created successfully',
        data: newInvoice
      });
  } catch (error) {
    res.status(500).json({ message: "Error creating invoice", error: error.message });
  }
};

//get all invoices
export const getInvoices = async (req, res) => {
    try {
      const invoices = await InvoiceModel.find().sort({ createdAt: -1 }); // newest first
      res.status(200).json(invoices);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch invoices", error: error.message });
    }
  };

  
// PUT update invoice by ID
export const updateInvoice = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("Updating invoice with ID:", id);
    const updatedInvoice = await InvoiceModel.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedInvoice) {
      return res.status(404).json({ message: "Invoice not found" });
    }
    res.status(200).json(updatedInvoice);
  } catch (err) {
    res.status(400).json({ message: "Error updating invoice", error: err.message });
  }
};


//send reminder email
export const sendReminderEmail = async (req, res) => {
  const { email, subject, message } = req.body;

  // Validate input fields
  if (!email || !subject || !message) {
    return res.status(400).json({ message: "Email, subject, and message are required." });
  }

  try {
    // Call the sendEmail function to send the email
    await sendEmail({
      to: email,
      subject: subject,
      html: `<p>${message}</p>`, // Email body (HTML)
    });

    res.status(200).json({ message: "Reminder sent successfully!" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ message: "Failed to send reminder" });
  }
};