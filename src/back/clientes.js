import { Sequelize, DataTypes } from 'sequelize';
import conectarBD from './conexion.js';
import { Router } from 'express';

const router = Router();
let Cliente;

(async () => {
    const sequelize = await conectarBD();

    Cliente = sequelize.define('Cliente',{
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
        unique: true
    },
    estado: {
        type: DataTypes.STRING,
        allowNull: false, 
        defaultValue: "Pendiente",
        validate: {
            isIn: [["Pendiente", "En Proceso", "Finalizado"]]
        }
    }
    }, {
        tableName: 'clientes',
        timestamps: false
    });
})();


router.post('/crear-cliente', async (req,res)=>{
    const usuarioId = req.session.usuarioId;
    const{nombre, descripcion, telefono} = req.body;
    const estadoC = "Pendiente";

    if (!usuarioId) {
        return res.status(401).json({ message: 'Usuario no autenticado' });
    }

    try{
        const cliente = await Cliente.create(
        {
            usuario_id: usuarioId,
            nombre: nombre,
            descripcion: descripcion,
            telefono: telefono,
            estado: estadoC
        },
        );
        res.status(201).json({ message: 'Cliente creado exitosamente', cliente });
    } catch(error){
        console.error(error);
        res.status(500).json({ message: 'Error al crear el cliente' });
    }
});

router.put('/editar/:id', async (req,res) => {
    const{id} = req.params;
    const{nombre, descripcion, telefono, estado} = req.body;

    try{
        const clienteActualizado = await Cliente.update(
            {
                nombre : nombre,
                descripcion,
                telefono : telefono,
                estado: estado
            },
            {
                where : {id : id}
            }
        );
        res.status(200).json({ message: 'Cliente editado exitosamente', clienteActualizado });
    } catch(error){
        console.error(error);
        res.status(500).json({ message: 'Error al editar el cliente' });
    }
});

router.get('/lista', async (req, res) => {
    console.log('Sesión del usuario:', req.session);
    if (!req.session || !req.session.usuarioId) {
        return res.status(401).json({ error: 'Usuario no autenticado' });
    }

    try {
        const listaClientes = await Cliente.findAll({
            where: {
                usuario_id: req.session.usuarioId
            }
        });
        console.log('Lista de clientes:', listaClientes);
        res.status(200).json({ message: 'Cliente editado exitosamente', listaClientes });
    } catch (error) {
        console.error('Error al obtener la lista de clientes:', error);
        res.status(500).json({ error: 'Error al obtener la lista de clientes' });
    }
});



router.delete('/eliminar/:id', async(req,res) => {
    const {id} = req.params;

    try{
        await Cliente.destroy({
            where:{id: id},
        });
        res.status(200).json({ message: 'Cliente borrado exitosamente' });
    } catch(error){
        console.error(error);
        res.status(500).json({ message: 'Error al borrar cliente' });
    }
});

export default router;