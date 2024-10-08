import { Sequelize } from 'sequelize';

export default async function conectarBD() {
    const sequelize = new Sequelize('database_db', 'root', 'mat1sql', {
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
