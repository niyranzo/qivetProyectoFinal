import Animal from '../models/Animal.js';
import Consultation from '../models/Consultation.js';
import fs from 'fs';         
import path from 'path';        
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const IMAGES_DIR = path.join(__dirname, '..', '..', 'public');

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
  const { id } = req.params;

  try {
    const animalToDelete = await Animal.findByPk(id);

    if (!animalToDelete) {
      return res.status(404).json({ error: 'Animal no encontrado' });
    }

    const imageName = animalToDelete.photo;

    await Consultation.destroy({
      where: { id_animal: id }
    });

    const deletedCount = await Animal.destroy({
      where: { id_animal: id }
    });

    if (deletedCount === 0) {
      return res.status(404).json({ error: 'Animal no encontrado o ya eliminado.' });
    }

    if (imageName) {
      const imagePath = path.join(IMAGES_DIR, imageName);

      fs.unlink(imagePath, (err) => {
        if (err) {
          console.error(`Error al eliminar el archivo de imagen ${imagePath}:`, err);
        } else {
          console.log(`Archivo de imagen ${imagePath} eliminado exitosamente.`);
        }
      });
    }

    res.json({ message: 'Animal, sus consultas y su imagen eliminados exitosamente.' });

  } catch (err) {
    console.error("Error general al eliminar el animal:", err);
    res.status(500).json({ error: err.message });
  }
};
