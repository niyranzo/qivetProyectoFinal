import {
  createConsultation,
  getAllConsultations,
  getConsultationById,
  updateConsultation,
  deleteConsultation,
  addVaccineToConsultation,
  setNextVisitDate,
  getUpcomingVisitDates,
  getAllConsultationsByid_animal,
  getLastConsultationByid_animal,
  getUpcomingVisitDatesWithAnimal,
  deleteNextVisitDate,
} from '../controllers/consultationController.js';

import express from 'express';

const router = express.Router();

router.post('/', createConsultation);
router.get('/', getAllConsultations);
router.get('/reserved-dates', getUpcomingVisitDates);
router.get('/animal/reserved-dates', getUpcomingVisitDatesWithAnimal);
router.get('/:id', getConsultationById);
router.put('/:id', updateConsultation);
router.delete('/:id', deleteConsultation);
router.post('/:id/add-vaccine', addVaccineToConsultation);
router.post('/:id/set-next-visit', setNextVisitDate);
router.patch('/:id/next-visit', deleteNextVisitDate);
router.get('/animal/:id_animal', getAllConsultationsByid_animal);
router.get('/animal/:id_animal/last', getLastConsultationByid_animal);
  
export default router;
