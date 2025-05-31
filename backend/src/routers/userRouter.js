import express from 'express';
import { deleteUser, getUserById, getUserProfile, getUsers, updateUser } from '../controllers/userController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

// rutas de usuarios
// addUser, 

router.get('/me', authMiddleware, getUserProfile);
router.get('/', getUsers);
router.get('/:id', getUserById);
router.delete('/:id', deleteUser);
router.patch('/:id', updateUser );


// aqui tengo q añadir las rutas que falta (logear con google)

export default router;
