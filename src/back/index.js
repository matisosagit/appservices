import express from 'express';
import bodyParser from 'body-parser';
import conectarBD from './conexion.js';
import sesion from './sesion.js';
import rutasUsuario from './usuarios.js';
import router from './clientes.js';

import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Esto te da la ruta real de este archivo (index.js)
const __filename = fileURLToPath(import.meta.url);

// Esto te da la carpeta donde está el archivo (igual que __dirname en CommonJS)
const __dirname = dirname(__filename);


const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(sesion);  

app.use(express.static(path.join(__dirname, 'public')));
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});


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




