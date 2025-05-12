import Animal from '../models/Animal.js';

// Crear animal
export const createAnimal = async (req, res) => {
  try {
    const animal = await Animal.create(req.body);
    res.status(201).json(animal);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getAnimal = async (req, res) => {
  try {
    const animal = await Animal.findByPk(req.params.id);
    if (!animal) return res.status(404).json({ error: 'Animal no encontrado' });
    res.json(animal);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// Obtener todos los animales de un usuario
export const getAnimalsByUser = async (req, res) => {
  try {
    const animals = await Animal.findAll({
      where: { id_user: req.params.id_user }
    });
    res.json(animals);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Editar un animal por ID
export const updateAnimal = async (req, res) => {
  try {
    const [updated] = await Animal.update(req.body, {
      where: { id_animal: req.params.id }
    });
    if (!updated) return res.status(404).json({ error: 'Animal no encontrado' });
    const updatedAnimal = await Animal.findByPk(req.params.id);
    res.json(updatedAnimal);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Eliminar un animal por ID
export const deleteAnimal = async (req, res) => {
  try {
    const deleted = await Animal.destroy({
      where: { id_animal: req.params.id }
    });
    if (!deleted) return res.status(404).json({ error: 'Animal no encontrado' });
    res.json({ message: 'Animal eliminado' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
