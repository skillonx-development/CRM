// controllers/memberController.js
import MemberModel from '../models/memberModel.js';

// Get all members
export const getMembers = async (req, res) => {
  try {
    const members = await MemberModel.find();
    res.status(200).json(members);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch members' });
  }
};

// Update approval status
export const updateApprovalStatus = async (req, res) => {
  const { id } = req.params;
  const { approve } = req.body;

  try {
    const updatedMember = await Member.findByIdAndUpdate(
      id,
      { approve },
      { new: true }
    );

    if (!updatedMember) return res.status(404).json({ message: "Member not found" });

    res.status(200).json(updatedMember);
  } catch (error) {
    res.status(500).json({ message: "Failed to update approval status", error });
  }
};


// Update dashboard permissions
export const updateMemberPermissions = async (req, res) => {
  const { id } = req.params;
  const { permissions } = req.body;

  try {
    const updatedMember = await MemberModel.findByIdAndUpdate(
      id,
      { permissions },
      { new: true }
    );
    res.status(200).json(updatedMember);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update permissions' });
  }
};
