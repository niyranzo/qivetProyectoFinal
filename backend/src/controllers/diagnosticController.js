import ImageDiagnostic from '../models/ImageDiagnostic.js';
import fs from 'fs';         
import path from 'path';        
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DIR = path.join(__dirname, '..', '..', 'public');

export const getByid_animal = async (req, res) => {
  try {
    const { id_animal } = req.params;
    const diagnostics = await ImageDiagnostic.findAll({ where: { id_animal } });
    res.json(diagnostics);
  } catch (error) {
    res.status(500).json({ error: 'Error retrieving diagnostics by animal ID' });
  }
};

export const getByDiagnosticId = async (req, res) => {
  try {
    const { id_diagnostic } = req.params;
    const diagnostic = await ImageDiagnostic.findByPk(id_diagnostic);
    if (!diagnostic) return res.status(404).json({ error: 'Diagnostic not found' });
    res.json(diagnostic);
  } catch (error) {
    res.status(500).json({ error: 'Error retrieving diagnostic by ID' });
  }
};

export const createDiagnostic = async (req, res) => {
  try {
    const { id_animal, report_pdf, image} = req.body;

    const newDiagnostic = await ImageDiagnostic.create({
      id_animal,
      report_pdf,
      image
    });

    res.status(201).json(newDiagnostic);
  } catch (error) {
    res.status(500).json({ error: 'Error creating diagnostic' });
  }
};

export const deleteDiagnostic = async (req, res) => {
  try {
    const { id_diagnostic } = req.params;

    const diagnostic = await ImageDiagnostic.findByPk(parseInt(id_diagnostic));
    if (!diagnostic) {
    return res.status(404).json({ error: 'Diagnóstico no encontrado' });
  }

    const image = diagnostic.image;
    const report_pdf = diagnostic.report_pdf;
    const deleted = await ImageDiagnostic.destroy({ where: { id_diagnostic } });
    if (!deleted) return res.status(404).json({ error: 'Diagnostico no Encontrado' });
    if(image && report_pdf){
      const imagePath = path.join(DIR, image);
      const pdfPath = path.join(DIR, report_pdf);
      fs.unlink(imagePath, (err) => {
        if (err) {
          console.error(`Error al eliminar el archivo de imagen ${imagePath}:`, err);
        } else {
          console.log(`Archivo de imagen ${imagePath} eliminado exitosamente.`);
        }
      });
      fs.unlink(pdfPath, (err) => {
        if (err) {
          console.error(`Error al eliminar el archivo de pdf ${pdfPath}:`, err);
        } else {
          console.log(`Archivo de pdf ${pdfPath} eliminado exitosamente.`);
        }
      });
    }

    res.json({ message: 'Diagnostico eliminado y su pdf e imagen' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting diagnostic' });
  }
};
