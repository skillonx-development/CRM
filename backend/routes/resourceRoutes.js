import express from 'express';
import {
    getResources,
    createResource,
    getResourceById,
    updateResource,
    deleteResource,
} from '../controllers/resourceController.js';
import { upload } from '../middlewares/uploadMiddleware.js';

const router = express.Router();

// Base routes
router.route('/')
    .get(getResources)
    .post(upload.single('file'), createResource);

router.route('/:id')
    .get(getResourceById)
    .put(updateResource)
    .delete(deleteResource);

export default router;
