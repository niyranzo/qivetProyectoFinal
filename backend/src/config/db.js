import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST, // <--- AHORA SÓLO CONFÍA EN LA VARIABLE DE ENTORNO
        port: process.env.DB_PORT,
        dialect: 'postgres',
        logging: false,
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        },
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false // Puede ser necesario para Railway
            }
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
const initDatabase = async (force = true) => {
    try {
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