import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';

const Vaccination = sequelize.define('Vaccination', {
  id_vaccine: {
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
  vaccine_name: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false
  },
  next_dose: {
    type: DataTypes.DATE
  }
}, {
  tableName: 'Vaccinations',
  timestamps: false
});

export default Vaccination; 