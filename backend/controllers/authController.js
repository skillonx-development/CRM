import bcryptjs from 'bcryptjs';
import Lead from '../models/leadModel.js';
import Member from '../models/memberModel.js';
import { generateTokenAndSetCookie } from '../utils/generateToken.js';


const isValidEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

// const isValidPassword = (password) => {
//   const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
//   return regex.test(password);
// }
// Register
export async function register(req, res) {
  try {
    const { type } = req.params;
    const { name, contactNumber, email, team, password, confirmPassword } = req.body;

    if (!name || !contactNumber || !email || !team || !password || !confirmPassword) {
      return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    if (!isValidEmail(email)) {
      return res.status(400).json({ success: false, message: 'Please enter a valid email address' });
    }

    // if (!isValidPassword(password)) {
    //   return res.status(400).json({ success: false, message: 'Password must be at least 6 characters and contain at least one uppercase letter, one lowercase letter, and one number' });
    // }

    if (password !== confirmPassword) {
      return res.status(400).json({ success: false, message: 'Passwords do not match' });
    }

    // Check if the user is already registered as a lead or member
    const existingLead = await Lead.findOne({ email });
    const existingMember = await Member.findOne({ email });

    if (existingLead && type === 'member') {
      return res.status(400).json({ success: false, message: 'User is already registered as a lead' });
    }

    if (existingMember && type === 'lead') {
      return res.status(400).json({ success: false, message: 'User is already registered as a member' });
    }

    if (type === 'lead') {
      if (existingLead) {
        return res.status(400).json({ success: false, message: 'Email already registered as a lead' });
      }

      const hashedPassword = await bcryptjs.hash(password, 10);

      const newLead = new Lead({
        name,
        contactNumber,
        email,
        team,
        password: hashedPassword
      })

      generateTokenAndSetCookie(newLead._id, res);
      await newLead.save();
      return res.status(201).json({ success: true, user: newLead })
    }
    else if (type === 'member') {
      if (existingMember) {
        return res.status(400).json({ success: false, message: 'Email already registered as a member' });
      }

      const hashedPassword = await bcryptjs.hash(password, 10);

      const newMember = new Member({
        name,
        contactNumber,
        email,
        team,
        password: hashedPassword
      })

      generateTokenAndSetCookie(newMember._id, res);
      await newMember.save();
      return res.status(201).json({ success: true, user: newMember })
    } else {
      return res.status(400).json({ success: false, message: 'Invalid user type' });
    }
  } catch (error) {
    console.error('Error in register:', error); // Log the error for debugging
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
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
