import { Router } from 'express';
import bcrypt from "bcryptjs";
import Usuario from '../modelos/usuario.js';
import user from '../controladores/user.Controllers.js';

const router = Router();

/* const hashPassword = async (password) => {
    const saltRounds = 10; 
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
}; */

router.post('/crear-usuario', async (req,res) => user.crearUsuario(req,res));

router.post('/iniciar-sesion', async (req,res)=> user.iniciarSesion(req,res));

router.post('/cerrar-sesion', user.cerrarSesion);

router.get('/nombre', async (req, res) => user.obtenerNombreUsuario(req, res));

router.get('/telefono', async (req, res) => user.obtenerTelefonoUsuario(req, res));


export default router;