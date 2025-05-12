import express from 'express';
import {
  getByAnimalId,
  getByAnalysisId,
  createAnalysis,
  deleteAnalysis
} from '../controllers/analysisController.js';

const router = express.Router();

router.get('/animal/:id_animal', getByAnimalId);
router.get('/:id_analysis', getByAnalysisId);
router.post('/', createAnalysis);
router.delete('/:id_analysis', deleteAnalysis);

export default router;
