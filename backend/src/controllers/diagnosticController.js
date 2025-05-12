import ImageDiagnostic from '../models/ImageDiagnostic.js';

export const getByAnimalId = async (req, res) => {
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
    // const { id_animal, date } = req.body;
    const { id_animal, date, report_pdf, image} = req.body;
    // const report_pdf = req.files?.report_pdf?.[0]?.buffer;
    // const image = req.files?.image?.[0]?.buffer;

    // if (!report_pdf || !image) {
    //   return res.status(400).json({ error: 'Missing PDF or image file' });
    // }

    const newDiagnostic = await ImageDiagnostic.create({
      id_animal,
      date,
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
    const deleted = await ImageDiagnostic.destroy({ where: { id_diagnostic } });

    if (!deleted) return res.status(404).json({ error: 'Diagnostic not found' });

    res.json({ message: 'Diagnostic deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting diagnostic' });
  }
};
