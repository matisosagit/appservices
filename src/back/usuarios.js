import express from 'express';
import { DataTypes } from 'sequelize';
import conectarBD from './conexion.js';
import { Router } from 'express';
import sesion from './sesion.js';
const router = Router();
let Usuario;

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
        }
    }, {
        tableName: 'usuarios',
        timestamps: false
    });
})();


router.post('/crear-usuario', async (req,res)=>{
    const{nombre, contraseña, correo} = req.body;

    try{
        const usuario = await Usuario.create(
        {
            nombre: nombre,
            contraseña: contraseña,
            correo: correo
        },
        {fields:['nombre', 'contraseña', 'correo']}
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
            contraseña: contraseña
        }});
    if(usuarioFind){
        req.session.usuarioId = usuarioFind.id;
        res.status(201).json({ message: 'Sesión iniciada exitosamente', usuarioFind });
    }else{
        return res.status(500).json({message: 'Error al iniciar sesión, usuario no encontrado'});
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


export default router;