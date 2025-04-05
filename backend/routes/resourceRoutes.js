import express from 'express';
import {
    getResources,
    createResource,
    getResourceById,
    updateResource,
    deleteResource,
} from '../controllers/resourceController.js';
import { upload } from '../middlewares/uploadMiddleware.js';
// import { protect } from '../middlewares/authMiddleware.js'; // ❌ Removed for now

const router = express.Router();

// 🚫 Authentication temporarily removed from all routes
router.route('/')
    .get(getResources)
    .post(upload.single('file'), createResource);

router.route('/:id')
    .get(getResourceById)
    .put(updateResource)
    .delete(deleteResource);

export default router;
