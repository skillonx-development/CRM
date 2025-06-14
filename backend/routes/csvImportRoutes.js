// routes/csvImportRoutes.js
import express from 'express';
import multer from 'multer';
import { importCSV, getImportTemplate } from '../controllers/csvImportController.js';

const router = express.Router();

// Configure multer for file upload
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'text/csv' || file.originalname.endsWith('.csv')) {
      cb(null, true);
    } else {
      cb(new Error('Only CSV files are allowed!'), false);
    }
  }
});

// Import CSV data
router.post('/import', upload.single('csvFile'), importCSV);

// Get import template
router.get('/template/:type', getImportTemplate);

// Error handling middleware for multer
router.use((error, req, res, next) => {
  if (error instanceof multer.MulterError) {
    if (error.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({
        success: false,
        message: 'File size too large. Maximum size is 5MB.'
      });
    }
  }
  
  if (error.message === 'Only CSV files are allowed!') {
    return res.status(400).json({
      success: false,
      message: 'Only CSV files are allowed!'
    });
  }
  
  return res.status(500).json({
    success: false,
    message: 'File upload error',
    error: error.message
  });
});

export default router;