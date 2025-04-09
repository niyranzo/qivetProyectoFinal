import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';

const ImageDiagnostic = sequelize.define('ImageDiagnostic', {
  id_diagnostic: {
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
    type: DataTypes.BLOB,
    allowNull: false
  },
  image: {
    type: DataTypes.BLOB,
    allowNull: false
  }
}, {
  tableName: 'ImageDiagnostics',
  timestamps: false
});

export default ImageDiagnostic; 