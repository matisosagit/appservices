import { Sequelize } from 'sequelize';

export default async function conectarBD() {
    const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        dialect: 'mysql'
    }
    );

    try {
        await sequelize.authenticate();
        console.log('Conexión exitosa');
    } catch (error) {
        console.error('Error al conectar:', error);
    }
    
    return sequelize;
}


