import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';

const User = sequelize.define('User', {
  id_user: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  type: {
    type: DataTypes.ENUM('user', 'admin'),
    allowNull: false,
    defaultValue: 'user'  
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  lastname: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  email: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  phone: {
    type: DataTypes.STRING(20)
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  changePassword: { // Campo para indicar si el usuario debe cambiar su contraseña
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true // Por defecto, debe cambiarla
  }
}, {
  tableName: 'Users',
  timestamps: false
});

export default User;
