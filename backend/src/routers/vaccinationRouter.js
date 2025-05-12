import express from 'express';
import {
  createVaccination,
  getVaccinationById,
  getVaccinationsByAnimal,
  updateVaccination,
  deleteVaccination
} from '../controllers/vaccinationController.js';

const router = express.Router();

router.post('/', createVaccination);
router.get('/:id', getVaccinationById);
router.get('/animal/:id_animal', getVaccinationsByAnimal);
router.put('/:id', updateVaccination);
router.delete('/:id', deleteVaccination);

export default router;
