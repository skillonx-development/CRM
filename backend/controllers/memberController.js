import bcrypt from 'bcryptjs';
import { getModelByTeamAndType, getMemberModelByTeam } from '../utils/getMemberModel.js';

// Get user by ID
export const getUserById = async (req, res) => {
  const { team, id } = req.params;
  try {
    const Model = getMemberModelByTeam(team); // Dynamically select the correct model based on team
    const user = await Model.findById(id); // Fetch the full user document

    console.log(user); // Log user to check the full data returned

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user); // Send the full user data (you can modify the response as needed)
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Get all members from a team
export const getMembersByTeam = async (req, res) => {
  const { team } = req.params;
  try {
    const Model = getMemberModelByTeam(team);
    const members = await Model.find();
    res.status(200).json(members);
  } catch (error) {
    res.status(400).json({ message: "Invalid team specified", error: error.message });
  }
};

// Update approval status
export const updateApprovalStatus = async (req, res) => {
  const { team, id } = req.params;
  const { approve } = req.body;

  try {
    const MemberModel = getMemberModelByTeam(team);
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

// Get permissions for a member
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

// Update password for a team member or lead
export const updateMemberPassword = async (req, res) => {
  const { team, id, type } = req.params;
  const { currentPassword, newPassword } = req.body;

  if (!currentPassword || !newPassword) {
    return res.status(400).json({ message: 'Current and new passwords are required' });
  }

  try {
    const model = getModelByTeamAndType(team, type); // Get model based on team and type (lead or member)
    const member = await model.findById(id);

    if (!member) {
      return res.status(404).json({ message: `${type === 'lead' ? 'Lead' : 'Member'} not found` });
    }

    const isMatch = await bcrypt.compare(currentPassword, member.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Current password is incorrect' });
    }

    const salt = await bcrypt.genSalt(10);
    member.password = await bcrypt.hash(newPassword, salt);
    await member.save();

    res.status(200).json({ message: 'Password updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error updating password', error: error.message });
  }
};

// update profile
// Update profile for a member
// Update profile for a team member or lead
export const updateProfile = async (req, res) => {
  const { team, id, type } = req.params;
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({ message: 'Name and email are required' });
  }

  try {
    const model = getModelByTeamAndType(team, type); // Get correct model (member or lead)
    const member = await model.findById(id);

    if (!member) {
      return res.status(404).json({ message: `${type === 'lead' ? 'Lead' : 'Member'} not found` });
    }

    member.name = name;
    member.email = email;

    await member.save();

    res.status(200).json({ message: 'Profile updated successfully', user: member });
  } catch (error) {
    console.error('Update Profile Error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

