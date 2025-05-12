import express from 'express';
import {
  createAnimal,
  getAnimalsByUser,
  updateAnimal,
  deleteAnimal,
  getAnimal
} from '../controllers/animalController.js';

const router = express.Router();

router.post('/', createAnimal);
router.get('/user/:id_user', getAnimalsByUser);
router.get('/:id', getAnimal);
router.put('/:id', updateAnimal);
router.delete('/:id', deleteAnimal);

export default router;
