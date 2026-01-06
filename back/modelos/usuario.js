import { DataTypes } from 'sequelize';
import sequelize from './conexion.js';


const Usuario = sequelize.define('Usuario', {
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
        is: {
            args: /^(09)[0-9]{7}$/,
            msg: "Celular inválido"
        }
        }
    }
}, {
    tableName: 'usuarios',
    timestamps: false
});

export default Usuario;