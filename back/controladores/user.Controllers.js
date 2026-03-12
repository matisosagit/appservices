import Usuario from "../modelos/usuario.js";
import bcrypt from "bcryptjs";

const hashPassword = async (password) => {
    const saltRounds = 10; 
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
};

export const crearUsuario = async (req, res) => {
    const { nombre, contraseña, correo, telefono } = req.body;
    const contraseñaHasheada = await hashPassword(contraseña);

    try{
        const usuario = await Usuario.create(
            {
                nombre: nombre,
                contraseña: contraseñaHasheada,
                correo: correo,
                telefono: telefono
            },
            {fields:['nombre', 'contraseña', 'correo', 'telefono']}
        );
            req.session.usuarioID = usuario.id;
            res.status(201).json({
                message: 'Usuario creado exitosamente',
                usuario
            });
    }catch(error){
        res.status(500).json({
            message: 'Error al crear el usuario',
            error
        });
    }
}

export const iniciarSesion = async (req, res) => {
    const { nombre, contraseña } = req.body;
    try{
        const usuario_a_buscar = await Usuario.findOne({ where: { nombre: nombre } });
        if(!usuario_a_buscar){
            return  res.status(404).json({
                message: 'Usuario no encontrado'
            });
        }
        const contraseña_valida = await bcrypt.compare(contraseña, usuario_a_buscar.contraseña);
        if(!contraseña_valida){
            return res.status(401).json({
                message: 'Contraseña incorrecta'
            });
        }
        req.session.save((err) => {
            if (err) {
                console.error("Error al guardar la sesión:", err);
                return res.status(500).json({ message: 'Error al procesar la sesión' });
            }
            req.session.usuarioId = usuario_a_buscar.id;
            req.session.nombre = usuario_a_buscar.nombre;

            console.log("Sesión guardada y confirmada");
            return res.status(200).json({
                message: 'Sesión iniciada exitosamente',
                usuario: usuario_a_buscar
            });
        });
    }catch(error){
        res.status(500).json({
            message: 'Error al iniciar sesión',
            error
        });
    }
}

export const obtenerNombreUsuario = async (req, res) => {
    if (!req.session || !req.session.usuarioId) {
        console.log("Error: sesión vacía o no existe");
        return res.status(401).json({ message: "No autorizado: sesión vacía" });
    }

    try {
        const usuario = await Usuario.findByPk(req.session.usuarioId);
        if (!usuario) {
            console.log("Error: usuario no encontrado");
            return res.status(401).json({ message: "Usuario no existe" });
        }
        console.log("Resultado: ÉXITO - Usuario encontrado:", usuario.nombre);
        return res.json({ nombre: usuario.nombre });
    } catch (error) {
        console.error("Error en DB:", error);
        return res.status(500).json({ message: "Error de base de datos" });
    }
}

export const obtenerTelefonoUsuario = async (req, res) => {
    if (!req.session || !req.session.usuarioId) {
        console.log("Error: sesión vacía o no existe");
        return res.status(401).json({ message: "No autorizado: sesión vacía" });
    }

    try {
        const usuario = await Usuario.findByPk(req.session.usuarioId);
        
        if (usuario) {
            res.json({ telefono: usuario.telefono });
        } else {
            res.status(401).json({ message: 'No hay sesión iniciada' });
        }
    } catch (error) {
        console.error('Error al buscar el usuario:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
}

export const cerrarSesion = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error('Error al cerrar sesión:', err);
            return res.status(500).json({ message: err });
        }else{
            res.clearCookie('connect.sid');
            res.status(200).json({ message: 'Sesión cerrada exitosamente' });
        }
});
}
