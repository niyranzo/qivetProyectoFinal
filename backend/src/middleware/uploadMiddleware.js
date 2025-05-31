import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename); 
const rootPath = path.resolve(__dirname, '../..');


const getFormattedDate = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

// Storage para imágenes
const storageImages = multer.diskStorage({
  destination: (req, file, cb) => {
    const imagesPath = path.join(rootPath, 'public/images');
    cb(null, imagesPath);
  },
  filename: (req, file, cb) => {
    const uniqueName = `${getFormattedDate()}-${file.originalname}`;
    cb(null, uniqueName);
  }
});

// Storage para PDFs
const storagePdfs = multer.diskStorage({
  destination: (req, file, cb) => {
    const pdfsPath = path.join(rootPath, 'public/pdfs');
    cb(null, pdfsPath);
  },
  filename: (req, file, cb) => {
    const uniqueName = `${getFormattedDate()}-${file.originalname}`;
    cb(null, uniqueName);
  }
});
export const uploadImages = multer({ storage: storageImages });
export const uploadPdfs = multer({ storage: storagePdfs });
