import bcryptjs from 'bcryptjs';
import Lead from '../models/leadModel.js';
import Member from '../models/memberModel.js';
import { generateTokenAndSetCookie } from '../utils/generateToken.js';

const isValidEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

// Register
export async function register(req, res) {
  try {
    console.log('Registration request body:', req.body); // Debug log
    console.log('Registration params:', req.params); // Debug log

    const { type } = req.params;
    const { name, contactNumber, email, team, password, confirmPassword } = req.body;

    // Normalize team value to match enum
    const normalizedTeam = team.charAt(0).toUpperCase() + team.slice(1).toLowerCase();

    // Enhanced validation
    if (!type || !['lead', 'member'].includes(type)) {
      return res.status(400).json({
        success: false,
        message: `Invalid user type: ${type}`
      });
    }

    if (!name || !contactNumber || !email || !team || !password) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields',
        received: { name, contactNumber, email, team }
      });
    }

    // Validate email format
    if (!isValidEmail(email)) {
      return res.status(400).json({ success: false, message: 'Please enter a valid email address' });
    }

    // Validate password match
    if (password !== confirmPassword) {
      return res.status(400).json({ success: false, message: 'Passwords do not match' });
    }

    // Check for existing users first
    const existingLead = await Lead.findOne({ email });
    const existingMember = await Member.findOne({ email });

    if (existingLead || existingMember) {
      return res.status(400).json({
        success: false,
        message: 'Email is already registered'
      });
    }

    try {
      // Hash password
      const hashedPassword = await bcryptjs.hash(password, 10);

      // Create user based on type
      const UserModel = type === 'lead' ? Lead : Member;
      const newUser = new UserModel({
        name,
        contactNumber,
        email,
        team: normalizedTeam,
        password: hashedPassword
      });

      console.log('Attempting to save user:', { name, email, team }); // Debug log

      const savedUser = await newUser.save();
      console.log('User saved successfully:', savedUser._id); // Debug log

      // Generate token and set cookie
      const token = generateTokenAndSetCookie(savedUser._id, savedUser.team, res);

      return res.status(201).json({
        success: true,
        message: 'Registration successful',
        user: {
          id: savedUser._id,
          name: savedUser.name,
          email: savedUser.email,
          team: savedUser.team
        }
      });

    } catch (dbError) {
      console.error('Database operation failed:', dbError);
      if (dbError.code === 11000) {
        return res.status(400).json({
          success: false,
          message: 'Email already registered'
        });
      }
      throw dbError;
    }

  } catch (error) {
    console.error('Registration failed:', error);
    return res.status(500).json({
      success: false,
      message: 'Registration failed',
      error: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
}

// Login
export async function login(req, res) {
  try {
    const { email, password, type } = req.body;

    // Validate required fields
    if (!email || !password || !type) {
      return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    // Validate user type
    if (type !== 'lead' && type !== 'member') {
      return res.status(400).json({ success: false, message: 'Invalid user type' });
    }

    // Find user based on type
    const user = type === 'lead'
      ? await Lead.findOne({ email })
      : await Member.findOne({ email });

    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    // Check password
    const isMatch = await bcryptjs.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    // Generate token with user team
    generateTokenAndSetCookie(user._id, user.team, res);

    let redirectPath;
    const team = user.team?.toLowerCase();
    const isLead = type === 'lead';

    // Determine redirect path based on team and type
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
        type: type
      }
    });

  } catch (error) {
    console.error('Error in login:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
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