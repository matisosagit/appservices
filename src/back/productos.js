import { Sequelize, DataTypes } from 'sequelize';
import conectarBD from './conexion.js';
import { Router } from 'express';

const router = Router();
let Repuesto;

(async () => {
    const sequelize = await conectarBD();
    Repuesto = sequelize.define('Repuesto',{
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        usuario_id: {
        allowNull: false,
        notEmpty: true,
        type: DataTypes.INTEGER
        },
        nombre: {
            type: DataTypes.STRING,
            allowNull: false,
            notEmpty: true
        },
        cantidad: {
            type: DataTypes.INTEGER,
        }
    },{
        tableName: 'repuestos'
    });
})();

router.post('anadir-repuesto', async (req, res) => {
    const {nombre, cantidad} = req.body;
    const userId = req.session.usuarioId;
    try{
        const repuesto = await Repuesto.create(
            {
                usuario_id: userId,
                nombre: nombre,
                cantidad: cantidad
            },
        );
        res.status(201).json({message:'Repuesto anadido correctamente',repuesto});
    }catch(e){
        console.error(e);
        res.status(500).json({message: 'Error al anadir repuesto', e})
    }
});

router.put('editar-repuesto', async(req,res) => {
    const cant = req.body;
    const id = req.params;
    try{
        const rep_act = await Repuesto.update(
            {cantidad: cant}, {where: {id: id}}
        );
        res.status(201).json({message:'OK', rep_act});
    }catch(e){
        console.error(e);
        res.status(500).json({message:'Error al editar datos', e});
    }
});

router.get('lista-stock', async(req, res) => {
    const user_id = req.session.usuarioId;
    try{
        const lista_stock = await Repuesto.findAll({where:{usuario_id: user_id}});
        res.status(201).json(lista_stock);
    }catch(e){
        console.error(e);
        res.status(500).json({message: 'Error al buscar lista de stock', e});
    }
});