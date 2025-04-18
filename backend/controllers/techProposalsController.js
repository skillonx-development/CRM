import TechProposal from "../models/techProposalsModel.js";
import { sendEmail } from "../utils/sendEmail.js";

// Create a new tech proposal
export const createTechProposal = async (req, res) => {
  try {
    const {
      institution,
      title,
      price,
      collegeEmail,
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
      collegeEmail,
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

//getSentProposals
export const getSentProposals = async (req, res) => {
  try {
    const sentProposals = await TechProposal.find({ sent: true });
    res.status(200).json(sentProposals);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch sent proposals" });
  }
};


// Update a tech proposal by ID before ending email
export const updateTechProposal = async (req, res) => {
  const { id } = req.params;
  const {
    title,
    status,
    institution,
    scheduledDate,
    price,
  } = req.body;

  try {
    const updated = await TechProposal.findByIdAndUpdate(
      id,
      {
        title,
        status,
        institution,
        scheduledDate,
        price,
      },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Proposal not found" });
    }

    res.json(updated);
  } catch (error) {
    console.error("Error updating proposal:", error);
    res.status(500).json({ message: "Server error while updating proposal" });
  }
};

//sending email to the college
export const sendTechProposalEmail = async (req, res) => {
  try {
    const proposal = await TechProposal.findById(req.params.id);
    if (!proposal) return res.status(404).json({ message: "Proposal not found" });

    const emailBody = `
      <h2>${proposal.title}</h2>
      <p><strong>Institution:</strong> ${proposal.institution}</p>
      <p><strong>Scheduled Date:</strong> ${proposal.scheduledDate}</p>
      <p><strong>Price:</strong> ₹${proposal.price}</p>
    `;

    await sendEmail({
      to: proposal.collegeEmail,
      subject: `Skiillonx Tech Proposal: ${proposal.title}`,
      html: emailBody,
    });

    proposal.status = "Sent";
    await proposal.save();

    res.status(200).json({ message: "Email sent successfully." });
  } catch (err) {
    console.error("Error sending email:", err);
    res.status(500).json({ message: "Failed to send email." });
  }
};

//admin approval for the proposal
export const updateAdminApproval = async (req, res) => {
  const { id } = req.params;
  const { adminApproval } = req.body; // expected: true or false

  try {
    const updatedProposal = await TechProposal.findByIdAndUpdate(
      id,
      { adminApproval },
      { new: true }
    );

    if (!updatedProposal) {
      return res.status(404).json({ message: 'Proposal not found' });
    }

    res.status(200).json(updatedProposal);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update admin approval', error });
  }
};