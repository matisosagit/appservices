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