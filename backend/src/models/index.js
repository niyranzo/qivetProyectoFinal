import { sequelize } from '../config/db.js';
import User from './User.js';
import Animal from './Animal.js';
import Vaccination from './Vaccination.js';
import BloodAnalysis from './BloodAnalysis.js';
import ImageDiagnostic from './ImageDiagnostic.js';
import Adoption from './Adoption.js';
import Blog from './Blog.js';

const models = {
  User,
  Animal,
  Vaccination,
  BloodAnalysis,
  ImageDiagnostic,
  Adoption,
  Blog
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

Animal.hasOne(Adoption, { foreignKey: 'id_animal' });
Adoption.belongsTo(Animal, { foreignKey: 'id_animal' });

User.hasMany(Blog, { foreignKey: 'id_user' });
Blog.belongsTo(User, { foreignKey: 'id_user' });

export {
  sequelize,
  User,
  Animal,
  Vaccination,
  BloodAnalysis,
  ImageDiagnostic,
  Adoption,
  Blog,
  models
};