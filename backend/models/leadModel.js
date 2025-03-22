import mongoose from 'mongoose';
import ROLES from '../config/roles.js';

const leadSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: Object.values(ROLES),
      required: true,
    }
  },
  { timestamps: true }
);

export const Lead = mongoose.model('Lead', leadSchema);
