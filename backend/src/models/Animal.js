import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';

const Animal = sequelize.define('Animal', {
  id_animal: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  id_user: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Users',
      key: 'id_user'
    }
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  photo: {
  type: DataTypes.STRING(255), 
  },
  species: {
    type: DataTypes.STRING(50)
  },
  race: {
    type: DataTypes.STRING(50)
  },
  birthday: {
    type: DataTypes.DATEONLY
  }
}, {
  tableName: 'Animals',
  timestamps: false,
  modelName: 'Animal'
});

export default Animal; 