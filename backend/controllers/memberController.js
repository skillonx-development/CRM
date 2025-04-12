import TechMember from '../models/techMemberModel.js';
import MarketingMember from '../models/marketingMemberModel.js';
import SalesMember from '../models/salesMemberModel.js';
import { getMemberModelByTeam } from '../utils/getMemberModel.js';

// Utility to get model based on team
const getModelByTeam = (team) => {
  switch (team) {
    case 'Tech': return TechMember;
    case 'Marketing': return MarketingMember;
    case 'Sales': return SalesMember;
    default: throw new Error('Invalid team specified');
  }
};


//get user by id
export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('userRole permissions');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};


// Get all members from all teams
export const getMembersByTeam = async (req, res) => {
  const { team } = req.params;
  const Model = getMemberModelByTeam(team);
  if (!Model) return res.status(400).json({ message: "Invalid team specified" });

  try {
    const members = await Model.find();
    res.status(200).json(members);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// Update approval status
export const updateApprovalStatus = async (req, res) => {
  const { team, id } = req.params;
  const { approve } = req.body;

  try {
    const MemberModel = getModelByTeam(team);
    const updatedMember = await MemberModel.findByIdAndUpdate(
      id,
      { approve },
      { new: true }
    );

    if (!updatedMember) {
      return res.status(404).json({ message: "Member not found" });
    }
    res.status(200).json(updatedMember);
  } catch (error) {
    res.status(500).json({ message: "Failed to update approval status", error: error.message });
  }
};


// Update dashboard permissions
export const updatePermissions = async (req, res) => {
  const { id } = req.params;
  const { permissions, team } = req.body;

  if (!team || !permissions) {
    return res.status(400).json({ message: 'Team and permissions are required' });
  }

  try {
    const model = getMemberModelByTeam(team);
    const member = await model.findById(id);

    if (!member) {
      return res.status(404).json({ message: 'Member not found' });
    }

    member.permissions = permissions;
    await member.save();

    res.status(200).json({ message: 'Permissions updated successfully' });
  } catch (error) {
    console.error('Update Permissions Error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

//getting permissions for a member
export const getPermissions = async (req, res) => {
  const { team, id } = req.params;

  try {
    const model = getMemberModelByTeam(team);
    const member = await model.findById(id);

    if (!member) {
      return res.status(404).json({ message: 'Member not found' });
    }

    res.status(200).json({ permissions: member.permissions || {} });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch permissions', error: error.message });
  }
};