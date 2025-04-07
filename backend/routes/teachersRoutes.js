// routes/teachersRoute.js
import express from 'express';
import { createTeacher, getTeachers, assignWorkshop } from '../controllers/teachersController.js';

const router = express.Router();

router.post('/add', createTeacher);
router.get('/', getTeachers);
router.post("/assign/:teacherName", assignWorkshop);

export default router;
