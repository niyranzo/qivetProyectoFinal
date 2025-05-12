import express from 'express';
import { getUserProfile, getUsers } from '../controllers/userController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

// rutas de usuarios
// addUser, 

router.get('/me', authMiddleware, getUserProfile);
router.get('/', getUsers);

// aqui tengo q añadir las rutas que falta (logear con google)

export default router;
