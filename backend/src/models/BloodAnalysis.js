import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';

const BloodAnalysis = sequelize.define('BloodAnalysis', {
  id_analysis: {
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
  date: {
    type: DataTypes.DATE,
    allowNull: false
  },
  report_pdf: {
    type: DataTypes.STRING(255),
    allowNull: false
  }
}, {
  tableName: 'BloodAnalysis',
  timestamps: false
});

export default BloodAnalysis; 