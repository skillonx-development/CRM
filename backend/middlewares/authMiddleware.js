import jwt from 'jsonwebtoken';
import Lead from '../models/leadModel.js';
import Member from '../models/memberModel.js';

export const protect = async (req, res, next) => {
  try {
    const token = req.cookies['jwt-crm'];

    if (!token) {
      return res.status(401).json({ success: false, message: 'Not authorized' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded.type === 'lead') {
      req.user = await Lead.findById(decoded.id).select('-password');
    } else if (decoded.type === 'member') {
      req.user = await Member.findById(decoded.id).select('-password');
    } else {
      return res.status(401).json({ success: false, message: 'Invalid user type' });
    }

    if (!req.user) {
      return res.status(401).json({ success: false, message: 'User not found' });
    }

    next();
  } catch (error) {
    res.status(401).json({ success: false, message: 'Invalid token' });
  }
};

export const authorize = (...roles) => (req, res, next) => {
  if (!roles.includes(req.user.team)) {
    return res.status(403).json({ success: false, message: 'Access Denied' });
  }
  next();
};
