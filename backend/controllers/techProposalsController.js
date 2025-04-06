import TechProposal from "../models/techProposalsModel.js";

// Create a new tech proposal
export const createTechProposal = async (req, res) => {
  try {
    const {
      institution,
      title,
      price,
      scheduledDate,
      scheduledTime,
      selectedTeacher,
      selectedVideo,
      selectedPDF,
      draft,
      timeline,
    } = req.body;

    const uploadedFileName = req.file ? req.file.filename : null;

    const newProposal = new TechProposal({
      institution,
      title,
      price,
      scheduledDate,
      scheduledTime,
      selectedTeacher,
      selectedVideo,
      selectedPDF,
      draft,
      timeline: typeof timeline === "string" ? JSON.parse(timeline) : timeline,
      uploadedFileName,
    });

    await newProposal.save();

    res.status(201).json({
      message: "Proposal created successfully",
      proposal: newProposal,
    });
  } catch (error) {
    console.error("Error creating proposal:", error);
    res.status(500).json({ message: "Failed to create proposal", error });
  }
};

// Get all proposals
export const getAllTechProposals = async (req, res) => {
  try {
    const proposals = await TechProposal.find().sort({ createdAt: -1 });
    res.status(200).json(proposals);
  } catch (error) {
    console.error("Error fetching proposals:", error);
    res.status(500).json({ message: "Failed to fetch proposals", error });
  }
};

// Mark proposal as sent with optional MOU upload
export const markProposalAsSent = async (req, res) => {
  try {
    const proposalId = req.params.id;
    const mouFile = req.file ? req.file.filename : null;

    const proposal = await TechProposal.findById(proposalId);
    if (!proposal) {
      return res.status(404).json({ message: "Proposal not found" });
    }

    proposal.sent = true;
    if (mouFile) {
      proposal.mou = mouFile;
    }

    await proposal.save();

    res.status(200).json({
      message: "Proposal marked as sent",
      proposal,
    });
  } catch (error) {
    console.error("Error updating proposal as sent:", error);
    res.status(500).json({ message: "Failed to update proposal", error });
  }
};
