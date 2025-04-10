import bcryptjs from 'bcryptjs';
import Lead from '../models/leadModel.js';
import Member from '../models/memberModel.js';
import { generateTokenAndSetCookie } from '../utils/generateToken.js';

// Utility to check email format
const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

// Register
export async function register(req, res) {
  try {
    const { type } = req.params;
    const { name, contactNumber, email, team, password, confirmPassword } = req.body;
    const normalizedTeam = team.charAt(0).toUpperCase() + team.slice(1).toLowerCase();

    if (!type || !['lead', 'member'].includes(type)) {
      return res.status(400).json({ success: false, message: `Invalid user type: ${type}` });
    }

    if (!name || !contactNumber || !email || !team || !password) {
      return res.status(400).json({ success: false, message: 'Missing required fields' });
    }

    if (!isValidEmail(email)) {
      return res.status(400).json({ success: false, message: 'Please enter a valid email address' });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ success: false, message: 'Passwords do not match' });
    }

    const existingLead = await Lead.findOne({ email });
    const existingMember = await Member.findOne({ email });

    if (existingLead || existingMember) {
      return res.status(400).json({ success: false, message: 'Email is already registered' });
    }

    const hashedPassword = await bcryptjs.hash(password, 10);
    const UserModel = type === 'lead' ? Lead : Member;
    const newUser = new UserModel({
      name,
      contactNumber,
      email,
      team: normalizedTeam,
      password: hashedPassword
    });

    const savedUser = await newUser.save();
    generateTokenAndSetCookie(savedUser._id, savedUser.team, res);

    return res.status(201).json({
      success: true,
      message: 'Registration successful',
      user: {
        id: savedUser._id,
        name: savedUser.name,
        email: savedUser.email,
        team: savedUser.team,
        role: type               // ✅ Include role
      }
    });

  } catch (error) {
    console.error('Registration failed:', error);
    return res.status(500).json({
      success: false,
      message: 'Registration failed',
      error: error.message
    });
  }
}

// Login
export async function login(req, res) {
  try {
    const { email, password, type } = req.body;

    if (!email || !password || !type) {
      return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    if (type !== 'lead' && type !== 'member') {
      return res.status(400).json({ success: false, message: 'Invalid user type' });
    }

    const user = type === 'lead'
      ? await Lead.findOne({ email })
      : await Member.findOne({ email });

    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    const isMatch = await bcryptjs.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    generateTokenAndSetCookie(user._id, user.team, res);

    let redirectPath;
    const team = user.team?.toLowerCase();
    const isLead = type === 'lead';

    switch (team) {
      case 'tech':
        redirectPath = isLead ? '/tech' : '/tech/team';
        break;
      case 'sales':
        redirectPath = isLead ? '/sales' : '/sales/team';
        break;
      case 'marketing':
        redirectPath = isLead ? '/marketing' : '/marketing/team';
        break;
      case 'admin':
        redirectPath = '/admin';
        break;
      default:
        return res.status(400).json({
          success: false,
          message: 'Invalid or missing team assignment'
        });
    }

    return res.status(200).json({
      success: true,
      redirect: redirectPath,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        team: user.team,
        role: user.userRole          // ✅ Include role
      }
    });

  } catch (error) {
    console.error('Error in login:', error);
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
}

// Logout
export async function logout(req, res) {
  try {
    res.clearCookie('jwt-crm');
    res.status(200).json({ success: true, message: 'Logged out successfully' });
  } catch (error) {
    console.error('Error in logout:', error);
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
}

// Check Auth (if you have it)
export async function checkAuth(req, res) {
  try {
    const user = req.user;

    if (!user) {
      return res.status(401).json({ success: false, message: 'Not authenticated' });
    }

    const role = user instanceof Lead ? 'lead' : 'member';

    res.status(200).json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        team: user.team,
        role                      // ✅ Include role here too
      }
    });
  } catch (error) {
    console.error('Check auth error:', error);
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
}
