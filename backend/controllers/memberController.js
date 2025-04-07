import MemberModel from '../models/memberModel.js';

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
