import express from "express";
import { createInvoice, getInvoices, updateInvoice, sendReminderEmail } from "../controllers/invoiceController.js";

const router = express.Router();

router.post("/create", createInvoice);
router.get("/", getInvoices);
router.put("/update/:id", updateInvoice);
router.post("/sendReminder", sendReminderEmail);

export default router;
