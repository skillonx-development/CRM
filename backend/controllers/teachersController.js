// controllers/teachersController.js
import TeachersModel from '../models/teachersModel.js';

export const createTeacher = async (req, res) => {
  try {
    const newTeacher = new TeachersModel(req.body);
    await newTeacher.save();
    res.status(201).json({ success: true, message: "Teacher added successfully", data: newTeacher });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to add teacher", error: error.message });
  }
};

//fetch all teachers
export const getTeachers = async (req, res) => {
    try {
      const teachers = await TeachersModel.find().sort({ createdAt: -1 });
      res.status(200).json(teachers);
    } catch (err) {
      res.status(500).json({ message: "Failed to fetch teachers", error: err.message });
    }
  };

  // Assign a workshop to a teacher
export const assignWorkshop = async (req, res) => {
    const { teacherName } = req.params;
    const { workshopTitle } = req.body;
  
    try {
      const teacher = await TeachersModel.findOneAndUpdate(
        { name: teacherName },
        { assignedWorkshop: workshopTitle },
        { new: true }
      );
  
      if (!teacher) {
        return res.status(404).json({ message: "Teacher not found" });
      }
  
      res.status(200).json(teacher);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };