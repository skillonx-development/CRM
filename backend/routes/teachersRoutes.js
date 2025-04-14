// routes/teachersRoute.js
import express from 'express';
import { createTeacher, getTeachers, assignWorkshop, updateTeacher } from '../controllers/teachersController.js';

const router = express.Router();

router.post('/add', createTeacher);
router.get('/', getTeachers);
router.post("/assign/:teacherName", assignWorkshop);
router.put("/:id", updateTeacher);

export default router;
