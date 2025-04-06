import mongoose from 'mongoose';

const memberSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true
  },
  contactNumber: {
    type: String,
    required: [true, 'Contact number is required'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    trim: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address']
  },
  team: {
    type: String,
    required: [true, 'Team is required'],
    enum: ['Sales', 'Marketing', 'Tech'],
    default: 'Sales'
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password should be at least 6 characters long']
  },
  approve: {
    type: Boolean,
    default: false
  },
  permissions: {
    overview: { type: Boolean, default: true },
    leads: { type: Boolean, default: true },
    proposals: { type: Boolean, default: true },
    orders: { type: Boolean, default: false },
    billing: { type: Boolean, default: false },
  }
}, {
  timestamps: true
});

// Create a virtual for confirmPassword
memberSchema.virtual('confirmPassword')
  .get(function () {
    return this._confirmPassword;
  })
  .set(function (value) {
    this._confirmPassword = value;
  });

const Member = mongoose.model('Member', memberSchema);

export default Member;