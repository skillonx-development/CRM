import College from "../models/collegeModel.js";
import School from "../models/schoolModel.js";

// Create a new institution
export const createInstitution = async (req, res) => {
  try {
    const { category, data } = req.body;

    if (!category || !data?.name || !data?.email || !data?.principal || !data?.contact) {
      return res.status(400).json({ message: "Missing required fields." });
    }

    // Simple email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      return res.status(400).json({ message: "Invalid email address." });
    }

    let newInstitution;
    if (category === "college") {
      newInstitution = new College(data);
    } else if (category === "school") {
      newInstitution = new School(data);
    } else {
      return res.status(400).json({ message: "Invalid category." });
    }

    const savedInstitution = await newInstitution.save();
    res.status(201).json({
      status: "success",
      message: `${category.charAt(0).toUpperCase() + category.slice(1)} added successfully.`,
      data: savedInstitution,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error creating institution",
      error: error.message,
    });
  }
};

// Get all institutions
export const getAllInstitutions = async (req, res) => {
  try {
    const colleges = await College.find().sort({ createdAt: -1 });
    const schools = await School.find().sort({ createdAt: -1 });

    res.status(200).json({
      status: "success",
      data: {
        colleges,
        schools,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch institutions",
      error: error.message,
    });
  }
};


// Add or update college/school based on category
export const editInstitution = async (req, res) => {
  const { id } = req.params;
  const { category, data } = req.body; // destructure properly

  if (!category) {
    return res.status(400).json({ message: 'Category is required (college or school)' });
  }

  try {
    let model;
    if (category === 'college') {
      model = College;
    } else if (category === 'school') {
      model = School;
    } else {
      return res.status(400).json({ message: 'Invalid category specified' });
    }

    const updatedInstitution = await model.findByIdAndUpdate(id, data, { new: true });

    if (!updatedInstitution) {
      return res.status(404).json({ message: 'Institution not found' });
    }

    res.status(200).json({ message: 'Institution updated successfully', institution: updatedInstitution });
  } catch (error) {
    console.error('Edit Institution Error:', error);
    res.status(500).json({ message: 'Error updating institution', error: error.message });
  }
};

//Delete institution
export const deleteInstitution = async (req, res) => {
  try {
    const { id } = req.params;
    const { type } = req.query;

    if (!type || !["college", "school"].includes(type)) {
      return res.status(400).json({
        status: "fail",
        message: "Invalid or missing institution type.",
      });
    }

    let deletedInstitution;

    if (type === "college") {
      deletedInstitution = await College.findByIdAndDelete(id);
    } else {
      deletedInstitution = await School.findByIdAndDelete(id);
    }

    if (!deletedInstitution) {
      return res.status(404).json({
        status: "fail",
        message: "Institution not found.",
      });
    }

    res.status(200).json({
      status: "success",
      message: "Institution deleted successfully",
      data: deletedInstitution,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Failed to delete institution",
      error: error.message,
    });
  }
};