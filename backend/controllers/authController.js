import bcryptjs from 'bcryptjs';
import { User } from '../models/userModel.js';
import { generateTokenAndSetCookie } from '../utils/generateToken.js';
import ROLES from '../config/roles.js';

// Signup
export async function signup(req, res) {
  try {
    const { email, password, username, role } = req.body;

    if (!email || !password || !username || !role) {
      return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    if (!Object.values(ROLES).includes(role)) {
      return res.status(400).json({ success: false, message: 'Invalid role' });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ success: false, message: 'Email already exists' });
    }

    const hashedPassword = await bcryptjs.hash(password, 10);

    const newUser = new User({
      email,
      username,
      password: hashedPassword,
      role,
    });

    await newUser.save();

    generateTokenAndSetCookie(newUser._id, res);

    res.status(201).json({ success: true, user: newUser });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
}

// Login
export async function login(req, res) {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    const isMatch = await bcryptjs.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    generateTokenAndSetCookie(user._id, res);

    res.status(200).json({ success: true, user });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
}

// Logout
export async function logout(req, res) {
  res.clearCookie('jwt-crm');
  res.status(200).json({ success: true, message: 'Logged out' });
}
