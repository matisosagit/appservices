import { DataTypes } from 'sequelize';
import sequelize from '../conexion.js';


const Cliente = sequelize.define('Cliente',{
id: {
type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
},
usuario_id: {
    allowNull: false,
    type: DataTypes.INTEGER,
        validate: {
            notEmpty: {
                msg: "Este campo no puede estar vacio"
            }
        }
},
nombre: {
    allowNull: false,
    type: DataTypes.STRING,
    validate: {
        notEmpty: {
            msg: "Este campo no puede estar vacio"
        }
    }
},
descripcion: {
    allowNull: false,
    type: DataTypes.STRING,
        validate: {
            notEmpty: {
                msg: "Este campo no puede estar vacio"
            }
        }
},
telefono: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
    is: {
        args: /^(09)[0-9]{7}$/,
        msg: "Celular inválido"
    },
        notEmpty: {
            msg: "Este campo no puede estar vacio"
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