import { Sequelize } from 'sequelize';
import { config } from 'dotenv';

config(); 

export default async function conectarBD() {
  const db = process.env.DB_NAME;
  const user = process.env.DB_USER;
  const pass = process.env.DB_PASS;
  const host = process.env.DB_HOST || 'localhost';
  const port = process.env.DB_PORT || 3306; 

  const sequelize = new Sequelize(db, user, pass, {
    host,
    port,
    dialect: 'mysql',
    logging: false
  });

  try {
    await sequelize.authenticate();
    console.log('Conexión exitosa a la base de datos');
  } catch (error) {
    console.error('Error al conectar a la base de datos:', error);
  }

  return sequelize;
}

