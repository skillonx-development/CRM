import express from 'express';
import { createInstitution, getAllInstitutions, editInstitution, deleteInstitution } from '../controllers/institutionController.js';

const router = express.Router();


router.post("/create", createInstitution);
router.get("/", getAllInstitutions);
router.put('/:id', editInstitution);
router.delete("/:id", deleteInstitution);


export default router;