import express from 'express';
import { protect, authorize } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Admin routes
router.get('/admin', protect, authorize('admin'), (req, res) => {
  res.json({
    success: true,
    message: 'Admin Dashboard',
    user: {
      id: req.user._id,
      name: req.user.name,
      email: req.user.email,
      role: req.user.role,
      team: 'admin'
    }
  });
});

// Team routes
router.get('/tech', protect, authorize('tech', 'lead'), (req, res) => {
  res.json({ message: 'Tech Dashboard' });
});

router.get('/sales', protect, authorize('sales', 'lead'), (req, res) => {
  res.json({ message: 'Sales Dashboard' });
});

router.get('/marketing', protect, authorize('marketing', 'lead'), (req, res) => {
  res.json({ message: 'Marketing Dashboard' });
});

// Redirect unauthorized users to login
router.use((req, res) => {
  res.status(403).json({ success: false, redirect: '/login', message: 'Access denied' });
});

export default router;
