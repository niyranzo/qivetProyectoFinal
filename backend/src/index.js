import express from 'express';
import cors from 'cors';
import { testConnection, initDatabase } from './config/db.js';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Ruta básica
app.get('/', (req, res) => {
  res.send('API de Veterinaria funcionando');
});

// Importar rutas
// const usuarioRoutes = require('./routes/usuario.routes');
// const animalRoutes = require('./routes/animal.routes');
// app.use('/api/usuarios', usuarioRoutes);
// app.use('/api/animales', animalRoutes);

// Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
  
  // Probar la conexión a la base de datos
  const connected = await testConnection();
  
  if (connected) {
    // Inicializar la base de datos (crear tablas)
    // Cambiamos a true para forzar la recreación de tablas una vez
    await initDatabase(true);
  }
});