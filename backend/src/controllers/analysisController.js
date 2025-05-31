import BloodAnalysis from '../models/BloodAnalysis.js';
import fs from 'fs';         
import path from 'path';        
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DIR = path.join(__dirname, '..', '..', 'public');

export const getByid_animal = async (req, res) => {
  try {
    const { id_animal } = req.params;
    const analyses = await BloodAnalysis.findAll({ where: { id_animal } });
    res.json(analyses);
  } catch (error) {
    res.status(500).json({ error: 'Error encontrando el Análisis por el ID del Animal' });
  }
};

export const getByAnalysisId = async (req, res) => {
  try {
    const { id_analysis } = req.params;
    const analysis = await BloodAnalysis.findByPk(id_analysis);
    if (!analysis) return res.status(404).json({ error: 'No se encontró el Análisis' });
    res.json(analysis);
  } catch (error) {
    res.status(500).json({ error: 'Error encontrando el Análisis por ID' });
  }
};

export const createAnalysis = async (req, res) => {
  try {
    const { id_animal } = req.body;
    const report_pdf = req.body.report_pdf;

    if (!report_pdf) {
      return res.status(400).json({ error: 'report_pdf es requerido' });
    }

    const newAnalysis = await BloodAnalysis.create({
      id_animal,
      report_pdf
    });

    res.status(201).json(newAnalysis);
  } catch (error) {
    res.status(500).json({ error: 'Error creando el Análisis' });
  }
};

export const deleteAnalysis = async (req, res) => {
  try {
    const { id_analysis } = req.params;

    const analysis = await BloodAnalysis.findByPk(id_analysis);
    if (!analysis) {
      return res.status(404).json({ error: 'No se encontró el análisis' });
    }
    const report_pdf = analysis.report_pdf;
    const deleted = await BloodAnalysis.destroy({ where: { id_analysis } });
    if (!deleted) return res.status(404).json({ error: 'No se encontró el análisis' });

    if(report_pdf){
      const pdfPath = path.join(DIR, report_pdf);
      fs.unlink(pdfPath, (err) => {
        if (err) {
          console.error(`Error al eliminar el archivo de pdf ${pdfPath}:`, err);
        } else {
          console.log(`Archivo  pdf ${pdfPath} eliminado exitosamente.`);
        }
      });
    }
    res.json({ message: 'Blood analysis deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting blood analysis' });
  }
};
