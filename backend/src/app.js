import express from 'express';
import cors from 'cors';
import userRouter from "./routers/userRouter.js";
import authRouter from "./routers/authRouter.js";
import vaccinationRouter from "./routers/vaccinationRouter.js";
import diagnosticRouter from "./routers/diagnosticRouter.js";
import analysisRouter from "./routers/analysisRouter.js";
import animalRouter from "./routers/animalRouter.js";
import cookieParser from 'cookie-parser';
import path from 'path';
import multer from 'multer';
import { fileURLToPath } from 'url';
import { initDatabase } from './config/db.js';

//para recrear las tablas
await initDatabase(false); // Cambia a true si quieres forzar la recreación de las tablas

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cookieParser());

// Middleware
app.use(cors({
  origin: 'http://localhost:5173', // el puerto donde corre tu front
  credentials: true
}));

//subir archivos
// Configurar Multer para imágenes
const storageImages = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, 'public/images'));
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + '-' + file.originalname;
    cb(null, uniqueName);
  }
});
const uploadImages = multer({ storage: storageImages });

// Configurar Multer para PDFs
const storagePdfs = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, 'public/pdfs'));
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + '-' + file.originalname;
    cb(null, uniqueName);
  }
});
const uploadPdfs = multer({ storage: storagePdfs });

// Servir imágenes y PDFs
app.use('/api/images', express.static(path.join(__dirname, 'public/images')));
app.use('/api/pdfs', express.static(path.join(__dirname, 'public/pdfs')));

// Ruta para subir imágenes
app.post('/upload-image', uploadImages.single('image'), (req, res) => {
  res.json({ imageUrl: `/${req.file.filename}` });
});

// Ruta para subir PDFs
app.post('/upload-pdf', uploadPdfs.single('pdf'), (req, res) => {
  res.json({ pdfUrl: `/pdfs/${req.file.filename}` });
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Ruta básica de prueba
app.get('/', (req, res) => {
  res.send('API de Veterinaria funcionando');
});

// Importar rutas
app.use('/api/user', userRouter);
app.use('/api/auth', authRouter);
app.use('/api/vaccination', vaccinationRouter);
app.use('/api/animals', animalRouter);
app.use('/api/diagnostic', diagnosticRouter);
app.use('/api/analysis', analysisRouter);

export default app;  // Exportamos la instancia de Express
