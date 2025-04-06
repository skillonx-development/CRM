import express from "express";
import { upload } from "../middlewares/uploadMiddleware.js";
import {
  createTechProposal,
  getAllTechProposals,
  markProposalAsSent,
} from "../controllers/techProposalsController.js";

const router = express.Router();

// File upload and proposal creation route
router.post("/create", upload.single("file"), createTechProposal);

router.get("/", getAllTechProposals);

router.patch("/send/:id", upload.single("mou"), markProposalAsSent);


export default router;
