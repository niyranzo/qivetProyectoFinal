import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';

const Adoption = sequelize.define('Adoption', {
  id_adoption: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  id_animal: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Animals',
      key: 'id_animal'
    }
  },
  adoption_date: {
    type: DataTypes.DATE,
    allowNull: false
  },
  status: {
    type: DataTypes.ENUM('Disponible', 'En proceso', 'Adoptado'),
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT
  }
}, {
  tableName: 'Adoptions',
  timestamps: false
});

export default Adoption; 