import express from "express";
import { upload } from "../middlewares/uploadMiddleware.js";
import {
  createTechProposal,
  getAllTechProposals,
  markProposalAsSent,
  getSentProposals,
  updateTechProposal,
  sendTechProposalEmail,
  updateAdminApproval,
} from "../controllers/techProposalsController.js";

const router = express.Router();

// Create new proposal with file upload
router.post("/create", upload.single("file"), createTechProposal);

// Get all proposals
router.get("/", getAllTechProposals);

// Mark as sent with optional MOU upload
router.patch("/send/:id", upload.single("mou"), markProposalAsSent);

//get sent proposals
router.get('/sent', getSentProposals);

//update proposal before sending the email
router.put("/:id", updateTechProposal);

// Send email for the given proposal ID
router.post("/send-email/:id", sendTechProposalEmail);

//admin approval for the proposal
router.put('/:id/admin-approval', updateAdminApproval);
export default router;
