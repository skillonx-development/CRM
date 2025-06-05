// routes/exportRoutes.js
import express from 'express';
const router = express.Router();
import { 
  exportColleges, 
  exportSchools, 
  exportCombined, 
  exportFiltered, 
  getExportStats 
} from '../controllers/exportController.js';

// @route   POST /api/export/colleges
// @desc    Export colleges data to Excel
// @access  Public (add authentication middleware if needed)
router.post('/colleges', exportColleges);

// @route   POST /api/export/schools
// @desc    Export schools data to Excel
// @access  Public (add authentication middleware if needed)
router.post('/schools', exportSchools);

// @route   POST /api/export/combined
// @desc    Export both colleges and schools data to Excel (multiple sheets)
// @access  Public (add authentication middleware if needed)
router.post('/combined', exportCombined);

// @route   POST /api/export/filtered
// @desc    Export filtered data to Excel
// @access  Public (add authentication middleware if needed)
router.post('/filtered', exportFiltered);

// @route   GET /api/export/stats
// @desc    Get export statistics
// @access  Public (add authentication middleware if needed)
router.get('/stats', getExportStats);

export default router;