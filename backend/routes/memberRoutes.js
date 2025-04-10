import express from "express";
import Member from "../models/memberModel.js"; 
import LeadMember from '../models/leadModel.js';
import { updateMemberPermissions, updateApprovalStatus} from '../controllers/memberController.js';


const router = express.Router();

//  Get all members
router.get("/getMembers", async (req, res) => {
  try {
    const members = await Member.find();
    res.status(200).json(members);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

//Get  all team leads
router.get("/getLeads", async (req, res) => {
  try {
    const leadMembers = await LeadMember.find();
    res.status(200).json(leadMembers);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

// ✅ Delete a member
router.delete("/deleteMember/:id", async (req, res) => {
  try {
    const memberId = req.params.id;
    await Member.findByIdAndDelete(memberId);
    res.status(200).json({ message: "Member deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting member", error: error.message });
  }
});

// ✅ Approve or reject a member
router.patch("/approveMember/:id", async (req, res) => {
  try {
    const { approve } = req.body;
    const updatedMember = await Member.findByIdAndUpdate(
      req.params.id,
      { approve },
      { new: true }
    );
    res.status(200).json(updatedMember);
  } catch (error) {
    res.status(500).json({ message: "Error updating approval", error: error.message });
  }
});

//for permission of dashboards
router.put('/updatePermissions/:id', updateMemberPermissions);

//toogle to approve
router.patch("/updateApproval/:id", updateApprovalStatus);

export default router;
