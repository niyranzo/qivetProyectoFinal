import express from 'express';
import multer from 'multer';
import {
  getByid_animal,
  getByDiagnosticId,
  createDiagnostic,
  deleteDiagnostic
} from '../controllers/diagnosticController.js';

const router = express.Router();
const upload = multer(); // default uses memory storage

router.get('/animal/:id_animal', getByid_animal);
router.get('/:id_diagnostic', getByDiagnosticId);
router.post('/', createDiagnostic);
router.delete('/:id_diagnostic', deleteDiagnostic);

export default router;
