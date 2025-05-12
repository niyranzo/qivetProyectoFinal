import BloodAnalysis from '../models/BloodAnalysis.js';

export const getByAnimalId = async (req, res) => {
  try {
    const { id_animal } = req.params;
    const analyses = await BloodAnalysis.findAll({ where: { id_animal } });
    res.json(analyses);
  } catch (error) {
    res.status(500).json({ error: 'Error retrieving blood analyses by animal ID' });
  }
};

export const getByAnalysisId = async (req, res) => {
  try {
    const { id_analysis } = req.params;
    const analysis = await BloodAnalysis.findByPk(id_analysis);
    if (!analysis) return res.status(404).json({ error: 'Blood analysis not found' });
    res.json(analysis);
  } catch (error) {
    res.status(500).json({ error: 'Error retrieving blood analysis by ID' });
  }
};

export const createAnalysis = async (req, res) => {
  try {
    const { id_animal, date } = req.body;
    const report_pdf = req.body.report_pdf;

    if (!report_pdf) {
      return res.status(400).json({ error: 'report_pdf is required' });
    }

    const newAnalysis = await BloodAnalysis.create({
      id_animal,
      date,
      report_pdf
    });

    res.status(201).json(newAnalysis);
  } catch (error) {
    res.status(500).json({ error: 'Error creating blood analysis' });
  }
};

export const deleteAnalysis = async (req, res) => {
  try {
    const { id_analysis } = req.params;
    const deleted = await BloodAnalysis.destroy({ where: { id_analysis } });

    if (!deleted) return res.status(404).json({ error: 'Blood analysis not found' });

    res.json({ message: 'Blood analysis deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting blood analysis' });
  }
};
