import jwt from 'jsonwebtoken';
import SalesMember from '../models/salesMemberModel.js';
import MarketingMember from '../models/marketingMemberModel.js';
import TechMember from '../models/techMemberModel.js';
import Lead from '../models/leadModel.js';

const userModels = [SalesMember, MarketingMember, TechMember, Lead];

const findUserById = async (id) => {
  for (const Model of userModels) {
    const user = await Model.findById(id);
    if (user) return user;
  }
  return null;
};

export const protect = async (req, res, next) => {
  const token = req.cookies?.['jwt-crm'];

  if (!token) {
    return res.status(401).json({ success: false, redirect: '/login', message: 'Not logged in' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await findUserById(decoded.id);
    if (!user) {
      return res.status(401).json({ success: false, redirect: '/login', message: 'User not found' });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ success: false, redirect: '/login', message: 'Invalid token' });
  }
};

export const authorize = (...roles) => {
  return (req, res, next) => {
    const userRole = req.user?.role?.toLowerCase();

    if (!req.user || !roles.includes(userRole)) {
      return res.status(403).json({ success: false, redirect: '/login', message: 'Access denied' });
    }

    next();
  };
};

export const restrictToUnauthenticated = (req, res, next) => {
  const token = req.cookies?.['jwt-crm'];

  if (token) {
    return res.status(403).json({ success: false, redirect: '/dashboard', message: 'Already logged in' });
  }

  next();
};
