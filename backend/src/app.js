import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import { initDatabase } from './config/db.js';

import userRouter from "./routers/userRouter.js";
import authRouter from "./routers/authRouter.js";
import vaccinationRouter from "./routers/vaccinationRouter.js";
import diagnosticRouter from "./routers/diagnosticRouter.js";
import analysisRouter from "./routers/analysisRouter.js";
import consultationRouter from "./routers/consultationRouter.js";
import animalRouter from "./routers/animalRouter.js";
import uploadRouter from "./routers/uploadRouter.js"; // NUEVO

// Inicializar DB
await initDatabase(false); // true para forzar recreación

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename); 
const rootPath = path.resolve(__dirname, '../');

// 🔧 Crear carpetas necesarias si no existen
const imagesPath = path.join(rootPath, 'public/images');
const pdfsPath = path.join(rootPath, 'public/pdfs');

[imagesPath, pdfsPath].forEach((dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    console.log(`📁 Carpeta creada: ${dir}`);
  }
});

// Middlewares
app.use(cors({
  origin: [
    'https://qivetproyectofinal-frontend-production.up.railway.app',
    'http://localhost:5173' 
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Cookie'],
  exposedHeaders: ['Set-Cookie'],
}));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Servir archivos estáticos
app.use('/api/images', express.static(path.join(rootPath, 'public/images')));
app.use('/api/pdfs', express.static(path.join(rootPath, 'public/pdfs')));

console.log("📂 Archivos servidos desde /api/images y /api/pdfs");

// Rutas API
app.use('/api/user', userRouter);
app.use('/api/auth', authRouter);
app.use('/api/vaccination', vaccinationRouter);
app.use('/api/animals', animalRouter);
app.use('/api/diagnostic', diagnosticRouter);
app.use('/api/analysis', analysisRouter);
app.use('/api/consultation', consultationRouter);
app.use('/api/upload', uploadRouter); 

app.use(express.static(path.join(rootPath, 'dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(rootPath, 'dist', 'index.html'));
});

// Ruta base
app.get('/', (req, res) => {
  res.send('API de Veterinaria funcionando');
});

export default app;
