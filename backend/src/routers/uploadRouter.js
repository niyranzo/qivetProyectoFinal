import express from 'express';
import { uploadImages, uploadPdfs } from '../middleware/uploadMiddleware.js';
import { uploadImage, uploadPdf } from '../controllers/uploadController.js';

const router = express.Router();

router.post('/image', uploadImages.single('photo'), uploadImage);
router.post('/pdf', uploadPdfs.single('pdf'), uploadPdf);

export default router;
