// models/teachersModel.js
import mongoose from 'mongoose';

const teacherSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  specialty: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['Available', 'Busy', 'Tentative'],
    default: 'Available',
  },
  workshops: {
    type: Number,
    default: 0,
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
  },
  assignedWorkshop:{
    type:String,
    default:""
  }
}, {
  timestamps: true,
});

const TeachersModel = mongoose.model('Teacher', teacherSchema);
export default TeachersModel;
