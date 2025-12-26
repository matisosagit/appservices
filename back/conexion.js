import { Sequelize } from "sequelize";
import { config } from "dotenv";

config();

export default async function conectarBD() {
  const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: "postgres",
    logging: false,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    }
  });

  try {
    await sequelize.authenticate();
    console.log("Conexión exitosa a PostgreSQL");
  } catch (error) {
    console.error("Error al conectar a la base de datos:", error);
    throw error;
  }

  return sequelize;
}

