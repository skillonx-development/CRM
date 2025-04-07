import express from 'express';
import { protect, authorize } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/admin', protect, authorize('admin'), (req, res) => {
  res.json({ message: 'Admin Dashboard' });
});

router.get('/tech', protect, authorize('tech'), (req, res) => {
  res.json({ message: 'Tech Dashboard' });
});

router.get('/sales', protect, authorize('sales'), (req, res) => {
  res.json({ message: 'Sales Dashboard' });
});

router.get('/marketing', protect, authorize('marketing'), (req, res) => {
  res.json({ message: 'Marketing Dashboard' });
});

// Redirect unauthorized users to login
router.use((req, res) => {
  res.status(403).json({ success: false, redirect: '/login', message: 'Access denied' });
});

export default router;
