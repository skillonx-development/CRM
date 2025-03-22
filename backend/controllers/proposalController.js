import Proposal from "../models/proposalModel.js";

// Create Proposal
export const createProposal = async (req, res) => {
  try {
    let { title, price, status, institution, scheduleDate, description } = req.body;

    if (!title || !price || !status || !institution || !scheduleDate) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    // ✅ Remove "$" symbol and convert to number
    if (typeof price === 'string') {
      price = parseFloat(price.replace(/[^0-9.]/g, ''));
      if (isNaN(price)) {
        return res.status(400).json({ success: false, message: "Invalid price format" });
      }
    }

    const newProposal = new Proposal({
      title,
      price,
      status,
      institution,
      scheduleDate,
      description,
    });

    await newProposal.save();

    res.status(201).json({
      success: true,
      proposal: newProposal,
    });
  } catch (error) {
    console.error("Error in createProposal:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
// Get All Proposals
export const getProposals = async (req, res) => {
  try {
    const proposals = await Proposal.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, proposals });
  } catch (error) {
    console.error("Error in getProposals:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// Get Single Proposal
export const getProposalById = async (req, res) => {
  try {
    const proposal = await Proposal.findById(req.params.id);
    if (!proposal) {
      return res.status(404).json({ success: false, message: "Proposal not found" });
    }
    res.status(200).json({ success: true, proposal });
  } catch (error) {
    console.error("Error in getProposalById:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// Update Proposal
export const updateProposal = async (req, res) => {
  try {
    const { title, price, status, institution, scheduleDate, description } = req.body;
    const proposal = await Proposal.findById(req.params.id);

    if (!proposal) {
      return res.status(404).json({ success: false, message: "Proposal not found" });
    }

    proposal.title = title || proposal.title;
    proposal.price = price || proposal.price;
    proposal.status = status || proposal.status;
    proposal.institution = institution || proposal.institution;
    proposal.scheduleDate = scheduleDate || proposal.scheduleDate;
    proposal.description = description || proposal.description;

    await proposal.save();

    res.status(200).json({ success: true, proposal });
  } catch (error) {
    console.error("Error in updateProposal:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// Delete Proposal
export const deleteProposal = async (req, res) => {
  try {
    const proposal = await Proposal.findById(req.params.id);
    if (!proposal) {
      return res.status(404).json({ success: false, message: "Proposal not found" });
    }

    await proposal.deleteOne();

    res.status(200).json({ success: true, message: "Proposal deleted successfully" });
  } catch (error) {
    console.error("Error in deleteProposal:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
