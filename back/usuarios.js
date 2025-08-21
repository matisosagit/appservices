import express from 'express';
import { DataTypes } from 'sequelize';
import conectarBD from './conexion.js';
import { Router } from 'express';
import sesion from './sesion.js';
import bcrypt from 'bcrypt';
const router = Router();
let Usuario;

const hashPassword = async (password) => {
    const saltRounds = 10; 
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
};

(async () => {
    const sequelize = await conectarBD();

    Usuario = sequelize.define('Usuario', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nombre: {
            type: DataTypes.STRING,
            allowNull: false,
            notEmpty: true
        },
        contraseña: {
            type: DataTypes.STRING,
            allowNull: false,
            notEmpty: true
        },
        correo: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
            validate: {
                isEmail: true,
                notEmpty: true
            }
        },
        telefono: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                is: /^(09)[0-9]{7}$/,
            }
        }
    }, {
        tableName: 'usuarios',
        timestamps: false
    });
})();


router.post('/crear-usuario', async (req,res)=>{
    const{nombre, contraseña, correo, telefono} = req.body;
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
        req.session.usuarioId = usuario.id;
        res.status(201).json({ message: 'Usuario creado exitosamente', usuario });

    } catch(error){
        console.error(error);
        res.status(500).json({ message: 'Error al crear el usuario' });
    }
});

router.post('/iniciar-sesion', async (req,res)=>{
    const{nombre, contraseña} = req.body;

    const usuarioFind = await  Usuario.findOne(
        {where: {
            nombre: nombre,
        }});
    if(usuarioFind){
        const esCorrecta = await bcrypt.compare(contraseña, usuarioFind.contraseña);
        if(esCorrecta){
            req.session.usuarioId = usuarioFind.id;
            res.status(201).json({ message: 'Sesión iniciada exitosamente', usuarioFind });
        }else{
            return res.status(401).json({message: 'Contraseña incorretca.'});
        }
    }else{
        return res.status(404).json({message: 'Error al iniciar sesión, usuario no encontrado'});
    }
});

router.get('/nombre', async (req, res) => {
    try {
        const usuario = await Usuario.findByPk(req.session.usuarioId);
        
        if (usuario) {
            res.json({ nombre: usuario.nombre });
        } else {
            res.status(401).json({ message: 'No hay sesión iniciada' });
        }
    } catch (error) {
        console.error('Error al buscar el usuario:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
});

router.get('/telefono', async (req, res) => {
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
});


export default router;