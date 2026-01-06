import { DataTypes } from 'sequelize';
import conectarBD from './conexion.js';

const sequelize = await conectarBD();

const Cliente = sequelize.define('Cliente',{
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
    allowNull: false,
    notEmpty: true,
    type: DataTypes.STRING
},
descripcion: {
    allowNull: false,
    notEmpty: true,
    type: DataTypes.STRING
},
telefono: {
    type: DataTypes.STRING,
    allowNull: false,
    notEmpty: true,
    unique: true,
    validate: {
    is: {
        args: /^(09)[0-9]{7}$/,
        msg: "Celular inválido"
    }
    }
},
estado: {
    type: DataTypes.STRING,
    allowNull: false, 
    defaultValue: "Pendiente",
    validate: {
        isIn: [["Pendiente", "En Proceso", "Finalizado"]]
    }
},
listo: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
},
codigo:{
    type: DataTypes.STRING,
    allowNull: false,
    notEmpty: true
},
fecha:{
    type: DataTypes.DATEONLY,
    allowNull: false,
    notEmpty: true
}
}, {
    tableName: 'clientes',
    timestamps: false
});

export default Cliente;