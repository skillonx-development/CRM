import express from 'express';
import { protect, authorize } from '../middlewares/authMiddleware.js'


const router = express.Router();


// Only accessible if user is in 'Sales' team
router.get('/sales', protect, authorize('Sales'), (req, res) => {
  res.json({ message: 'Only Sales team can see this' });
});

export default router;
