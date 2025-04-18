import express from "express";
import LeadMember from "../models/leadModel.js";
import { getMembersByTeam,
  updatePermissions, 
  updateApprovalStatus,
   getPermissions, 
   getUserById,
  updateMemberPassword,
  updateProfile,
getLeadsByTeam,
updateLeadApprovalStatus} from "../controllers/memberController.js";
import { getModelByTeamAndType } from "../utils/getMemberModel.js";

const router = express.Router();

//get user by id
router.get('/:id', getUserById);

// Get all members for a team
router.get("/getMembers/:team", getMembersByTeam);

// Get all team leads
router.get("/getLeads/:team", getLeadsByTeam);

// Delete a member by team
router.delete("/deleteMember/:team/:id", async (req, res) => {
  const { team, id } = req.params;
  const Model = getMemberModelByTeam(team);
  if (!Model) return res.status(400).json({ message: "Invalid team specified" });

  try {
    await Model.findByIdAndDelete(id);
    res.status(200).json({ message: "Member deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting member", error: error.message });
  }
});

// Dashboard permissions update
router.put("/updatePermissions/:id", updatePermissions);

//fetcing dashboards permission data for user
router.get('/getPermissions/:team/:id', getPermissions);

// Update approval status
router.patch("/updateApproval/:team/:id", updateApprovalStatus);

//update lead approval status
router.put('/updateLeadApproval/:id', updateLeadApprovalStatus);


//update user password
router.put('/update-password/:team/:id/:type', updateMemberPassword);

//update profile data

router.put('/update-profile/:team/:id/:type', updateProfile);


export default router;
