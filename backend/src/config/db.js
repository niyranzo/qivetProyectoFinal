import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { User } from '../models/index.js';

dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME || 'qivet_db',
  process.env.DB_USER || 'admin',
  process.env.DB_PASSWORD || 'admin',
  {
    host: process.env.DB_HOST || 'postgres',
    port: process.env.DB_PORT || 5432,
    dialect: 'postgres',
    logging: false,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  }
);

// Función para probar la conexión
const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('Conexión a la base de datos establecida correctamente.');
    return true;
  } catch (error) {
    console.error('Error al conectar con la base de datos:', error);
    return false;
  }
};

// Función para inicializar tablas
const initDatabase = async (force = false) => {
    try {
      let models;
      try {
        models = require('../models');
      } catch (err) {
        console.error('❌ Error al importar modelos:', err);
        process.exit(1);
      }
      
      await sequelize.sync({ force });
      console.log('✅ Base de datos inicializada correctamente.');
      return true;
    } catch (error) {
      console.error('❌ Error al inicializar la base de datos:', error);
      process.exit(1);
    }
  };

export {
  sequelize,
  testConnection,
  initDatabase
};