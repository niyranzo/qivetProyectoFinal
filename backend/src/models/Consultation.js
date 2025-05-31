// models/History.js
import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';

const Consultation = sequelize.define('Consultation', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  id_animal: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Animals',
      key: 'id_animal'
    }
  },
  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Users',
      key: 'id_user'
    }
  },
  visitDate: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  description: {
    type: DataTypes.TEXT
  },
  nextVisitDate: {
    type: DataTypes.DATE,
    allowNull: true
  }
}, {
  tableName: 'Consultation',
  timestamps: false
});

export default Consultation;
