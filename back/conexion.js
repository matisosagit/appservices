import { Sequelize } from 'sequelize';
import {configDotenv} from 'dotenv';
configDotenv();


export default async function conectarBD() {
    const db = process.env.DB_NAME;
    const user = process.env.DB_USER;
    const pass = process.env.DB_PASS;
    
    const sequelize = new Sequelize(`${db}`, `${user}`, `${pass}`, {
        host: 'localhost',
        dialect: 'mysql'
    });

    try {
        await sequelize.authenticate();
        console.log('Conexión exitosa');
    } catch (error) {
        console.error('Error al conectar:', error);
    }
    
    return sequelize;
}
