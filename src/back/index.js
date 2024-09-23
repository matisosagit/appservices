import express from 'express';
import bodyParser from 'body-parser';
import conectarBD from './conexion.js';
import sesion from './sesion.js';
import rutasUsuario from './usuarios.js';
import router from './clientes.js';

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(sesion);  


app.use('/api/usuarios', rutasUsuario);
app.use('/api/clientes', router);

(async () => {
    try {
        const sequelize = await conectarBD();
        await sequelize.sync({ force: false });
        app.listen(3000, () => {
            console.log('Servidor escuchando en http://localhost:3000');
        });
    } catch (error) {
        console.error('Error al iniciar el servidor:', error);
    }
})();




