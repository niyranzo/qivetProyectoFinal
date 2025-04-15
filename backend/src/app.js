import express from 'express';
import cors from 'cors';
import userRouter from "./routers/userRouter.js";
import authRouter from "./routers/authRouter.js";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Ruta básica de prueba
app.get('/', (req, res) => {
  res.send('API de Veterinaria funcionando');
});

// Importar rutas
// import usuarioRoutes from './routes/usuario.routes.js';
// import animalRoutes from './routes/animal.routes.js';
app.use('/api/user', userRouter);
app.use('/api/auth', authRouter);
// app.use('/api/animales', animalRoutes);

export default app;  // Exportamos la instancia de Express
