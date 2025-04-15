import { sequelize } from '../config/db.js';
import User from './User.js';
import Animal from './Animal.js';
import Vaccination from './Vaccination.js';
import BloodAnalysis from './BloodAnalysis.js';
import ImageDiagnostic from './ImageDiagnostic.js';

const models = {
  User,
  Animal,
  Vaccination,
  BloodAnalysis,
  ImageDiagnostic,
};

// Definir las asociaciones
User.hasMany(Animal, { foreignKey: 'id_user' });
Animal.belongsTo(User, { foreignKey: 'id_user' });

Animal.hasMany(Vaccination, { foreignKey: 'id_animal' });
Vaccination.belongsTo(Animal, { foreignKey: 'id_animal' });

Animal.hasMany(BloodAnalysis, { foreignKey: 'id_animal' });
BloodAnalysis.belongsTo(Animal, { foreignKey: 'id_animal' });

Animal.hasMany(ImageDiagnostic, { foreignKey: 'id_animal' });
ImageDiagnostic.belongsTo(Animal, { foreignKey: 'id_animal' });

export {
  sequelize,
  User,
  Animal,
  Vaccination,
  BloodAnalysis,
  ImageDiagnostic,
  models
};