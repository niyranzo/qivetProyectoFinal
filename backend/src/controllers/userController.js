import User from '../models/User.js';

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

// Eliminar un usuario
export const deleteUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });
    
    await user.destroy();
    res.json({ message: 'Usuario eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el usuario' });
  }
};

// Obtener el perfil de un usuario
export const getUserProfile = async (req, res) => {
  try {
      const user = await User.findByPk(req.userId, {
          attributes: ['id', 'username'] // Excluye 'password'
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