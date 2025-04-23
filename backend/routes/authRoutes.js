import express from 'express';
import { register, login, logout } from '../controllers/authController.js';
import { protect, restrictToUnauthenticated } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/register/:type', register);
router.post('/login', restrictToUnauthenticated, login);
router.post('/logout', logout);

// Check authentication
router.get('/check', protect, (req, res) => {
    res.status(200).json({ success: true, user: req.user });
});

export default router;