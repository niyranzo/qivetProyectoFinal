import Vaccination from '../models/Vaccination.js';

// Crear vacunación
export const createVaccination = async (req, res) => {
  try {
    const vaccination = await Vaccination.create(req.body);
    res.status(201).json(vaccination);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Obtener vacunación por ID
export const getVaccinationById = async (req, res) => {
  try {
    const vaccination = await Vaccination.findByPk(req.params.id);
    if (!vaccination) return res.status(404).json({ error: 'Vacunación no encontrada' });
    res.json(vaccination);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Obtener vacunaciones por animal
export const getVaccinationsByAnimal = async (req, res) => {
  try {
    const vaccinations = await Vaccination.findAll({
      where: { id_animal: req.params.id_animal }
    });
    res.json(vaccinations);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Editar vacunación
export const updateVaccination = async (req, res) => {
  try {
    const [updated] = await Vaccination.update(req.body, {
      where: { id_vaccine: req.params.id }
    });
    if (!updated) return res.status(404).json({ error: 'Vacunación no encontrada' });
    const updatedVaccination = await Vaccination.findByPk(req.params.id);
    res.json(updatedVaccination);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Eliminar vacunación
export const deleteVaccination = async (req, res) => {
  try {
    const deleted = await Vaccination.destroy({
      where: { id_vaccine: req.params.id }
    });
    if (!deleted) return res.status(404).json({ error: 'Vacunación no encontrada' });
    res.json({ message: 'Vacunación eliminada' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
