import User from '../models/User.js';
import Animal from '../models/Animal.js';
import bcrypt from 'bcryptjs';

// Obtener todos los usuarios
export const getUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los usuarios' });
  }
};

// Obtener un usuario por ID
export const getUserById = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el usuario' });
  }
};

// Actualizar un usuario
export const updateUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });
    
    await user.update(req.body);
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el usuario' });
  }
};

// Obtener el perfil de un usuario
export const getUserProfile = async (req, res) => {
  try {
      const user = await User.findByPk(req.userId, {
          attributes: ['id_user', 'name', 'lastname', 'email', 'phone', 'type']
      });

      if (!user) {
          return res.status(404).json({ mensaje: "El usuario no existe" });
      }

      res.json(user); // O si quieres un objeto específico: { id: user.id, username: user.username }
  } catch (error) {
      console.error(error);
      res.status(400).json({ mensaje: "Error al obtener el perfil del usuario" });
  }
}

export const deleteUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);

    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    // Buscar mascotas del usuario antes de eliminarlas
    const pets = await Animal.findAll({
      where: { id_user: req.params.id }
    });

    // Convertir los resultados a objetos simples
    const petsData = pets.map(pet => pet.toJSON());

    // Eliminar las mascotas
    await Animal.destroy({
      where: { id_user: req.params.id }
    });

    // Guardar datos del usuario antes de eliminar
    const userData = user.toJSON();

    // Eliminar el usuario
    await user.destroy();

    // Devolver respuesta con los datos eliminados
    res.json({
      message: 'Usuario y sus mascotas eliminados correctamente',
      user: userData,
      mascotasEliminadas: petsData
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al eliminar el usuario y sus mascotas' });
  }
};

export const changePassword = async (req, res) => {
    try {
        const { oldPassword, newPassword } = req.body;
        const userId = req.userId; // Viene del authMiddleware

        // 1. Verificar que el usuario existe
        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        const isMatch = await bcrypt.compare(oldPassword, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Contraseña antigua incorrecta" });
        }

        // 3. Hashear la nueva contraseña
        const hashedNewPassword = await bcrypt.hash(newPassword, 10);

        // 4. Actualizar la contraseña y establecer changePassword a false
        user.password = hashedNewPassword;
        user.changePassword = false; // El usuario ya ha cambiado su contraseña
        await user.save();

        res.status(200).json({ message: "Contraseña actualizada exitosamente" });

    } catch (error) {
        console.error("Error al cambiar la contraseña:", error);
        res.status(400).json({ message: "Error al cambiar la contraseña" });
    }
};