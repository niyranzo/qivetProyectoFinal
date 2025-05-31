import express from 'express';
import {
  getByid_animal,
  getByAnalysisId,
  createAnalysis,
  deleteAnalysis
} from '../controllers/analysisController.js';

const router = express.Router();

router.get('/animal/:id_animal', getByid_animal);
router.get('/:id_analysis', getByAnalysisId);
router.post('/', createAnalysis);
router.delete('/:id_analysis', deleteAnalysis);

export default router;
