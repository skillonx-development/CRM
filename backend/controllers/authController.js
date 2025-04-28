import bcryptjs from 'bcryptjs';
import Admin from '../models/adminModel.js';  
import Lead from '../models/leadModel.js';
import TechMember from '../models/techMemberModel.js';
import SalesMember from '../models/salesMemberModel.js';
import MarketingMember from '../models/marketingMemberModel.js';
import { generateTokenAndSetCookie } from '../utils/generateToken.js';

// Utility to check email format
const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

// Get appropriate member model based on team
const getMemberModelByTeam = (team) => {
  switch (team.toLowerCase()) {
    case 'tech':
      return TechMember;
    case 'sales':
      return SalesMember;
    case 'marketing':
      return MarketingMember;
    default:
      return null;
  }
};

// 🔁 Register
export async function register(req, res) {
  try {
    const { type } = req.params; // 'lead' or 'member'
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

    // Check existing email in all models
    const leadExists = await Lead.findOne({ email });
    const techExists = await TechMember.findOne({ email });
    const salesExists = await SalesMember.findOne({ email });
    const marketingExists = await MarketingMember.findOne({ email });

    if (leadExists || techExists || salesExists || marketingExists) {
      return res.status(400).json({ success: false, message: 'Email is already registered' });
    }

    const hashedPassword = await bcryptjs.hash(password, 10);

    let UserModel;
    let userRole;

    if (type === 'lead') {
      UserModel = Lead;
      userRole = 'lead'; // Changed to lowercase for consistency
    } else {
      const memberModel = getMemberModelByTeam(team);
      if (!memberModel) {
        return res.status(400).json({ success: false, message: 'Invalid team selection' });
      }
      UserModel = memberModel;
      userRole = 'member'; // Changed to lowercase for consistency
    }

    const newUser = new UserModel({
      name,
      contactNumber,
      email,
      team: normalizedTeam,
      password: hashedPassword,
      role: userRole,
      permissions: undefined,
      approve: false
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
        role: userRole
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



// 🔐 Login
export async function login(req, res) {
  try {
    const { email, password, type } = req.body;

    if (!email || !password || !type) {
      return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    if (type !== 'lead' && type !== 'member' && type !== 'admin') {
      return res.status(400).json({ success: false, message: 'Invalid user type' });
    }

    let user;

    if (type === 'admin') {
      user = await Admin.findOne({ email });
      if (!user) {
        return res.status(401).json({ success: false, message: 'Invalid credentials' });
      }

      const isMatch = await bcryptjs.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ success: false, message: 'Invalid credentials' });
      }

      generateTokenAndSetCookie(user._id, 'admin', res);

      return res.status(200).json({
        success: true,
        redirect: '/admin',
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: 'admin',
          team: 'admin'
        }
      });
    }

    // Lead or Member
    if (type === 'lead') {
      user = await Lead.findOne({ email });
      if (!user) {
        return res.status(401).json({ success: false, message: 'Invalid credentials' });
      }

      const isMatch = await bcryptjs.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ success: false, message: 'Invalid credentials' });
      }

      // Check if lead is approved
      if (!user.approve) {
        return res.status(403).json({
          success: false,
          message: 'Lead must be approved before logging in'
        });
      }

      generateTokenAndSetCookie(user._id, user.team, res);

      let redirectPath = user.team?.toLowerCase() === 'tech' ? '/tech' : '/lead';
      return res.status(200).json({
        success: true,
        redirect: redirectPath,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          team: user.team,
          role: 'lead'
        }
      });
    } else {
      user = await TechMember.findOne({ email }) ||
        await SalesMember.findOne({ email }) ||
        await MarketingMember.findOne({ email });
    }

    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    const isMatch = await bcryptjs.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    // Check member approval
    if (type === 'member' && !user.approve) {
      return res.status(403).json({
        success: false,
        message: 'Needs to be approved by the team lead'
      });
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
        role: user.role
      }
    });

  } catch (error) {
    console.error('Error in login:', error);
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
}



// 🚪 Logout
export async function logout(req, res) {
  try {
    res.clearCookie('jwt-crm', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
      path: '/',
    });
    res.status(200).json({ success: true, message: 'Logged out successfully' });
  } catch (error) {
    console.error('Error in logout:', error);
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
}


// 🔐 Auth Check
export async function checkAuth(req, res) {
  try {
    const user = req.user;

    if (!user) {
      return res.status(401).json({ success: false, message: 'Not authenticated' });
    }

    let role;
    if (user instanceof Admin) {
      role = 'admin';
    } else if (user instanceof Lead) {
      role = 'lead';
    } else {
      role = 'member';
    } // Changed to lowercase for consistency

    res.status(200).json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        team: user.team,
        role
      }
    });
  } catch (error) {
    console.error('Check auth error:', error);
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
}