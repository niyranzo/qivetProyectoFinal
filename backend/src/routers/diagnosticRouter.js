import express from 'express';
import multer from 'multer';
import {
  getByAnimalId,
  getByDiagnosticId,
  createDiagnostic,
  deleteDiagnostic
} from '../controllers/diagnosticController.js';

const router = express.Router();
const upload = multer(); // default uses memory storage

router.get('/animal/:id_animal', getByAnimalId);
router.get('/:id_diagnostic', getByDiagnosticId);
// router.post('/', upload.fields([{ name: 'report_pdf' }, { name: 'image' }]), createDiagnostic);
router.post('/', createDiagnostic);
router.delete('/:id_diagnostic', deleteDiagnostic);

export default router;
