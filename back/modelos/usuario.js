import { DataTypes } from 'sequelize';
import sequelize from '../conexion.js';


const Usuario = sequelize.define('Usuario', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Este campo no puede estar vacio"
            }
        }
    },
    contraseña: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Este campo no puede estar vacio"
            }
        }
    },
    correo: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate: {
            isEmail: true,
            notEmpty: {
                msg: "Este campo no puede estar vacio"
            }
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