import { Router } from 'express';
import { nanoid } from 'nanoid';
import Cliente from '../modelos/cliente.js';


const router = Router();

router.post('/crear-cliente', async (req,res)=>{
    const usuarioId = req.session.usuarioId;
    const{nombre, descripcion, telefono} = req.body;
    const estadoC = "Pendiente";
    const codigoUnico = nanoid(10);
    const hoy = new Date();
    const fecha = hoy.toISOString().split("T")[0];

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
            estado: estadoC,
            codigo: codigoUnico,
            fecha: fecha
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
                where : {id : id},
                validate: true
            }
        );
        res.status(200).json({ message: 'Cliente editado exitosamente', clienteActualizado });
    } catch(error){
        console.error(error);
        res.status(500).json({ message: 'Error al editar el cliente' });
    }
});

router.get('/lista', async (req, res) => {
    if (!req.session || !req.session.usuarioId) {
        return res.status(401).json({ error: 'Usuario no autenticado' });
    }

    try {
        const listaClientes = await Cliente.findAll({
            where: {
                usuario_id: req.session.usuarioId,
                listo: false
            }
        });
        console.log('Lista de clientes:', listaClientes);
        res.status(200).json({ message: 'Lista exitosa.', listaClientes });
    } catch (error) {
        console.error('Error al obtener la lista de clientes:', error);
        res.status(500).json({ error: 'Error al obtener la lista de clientes' });
    }
});

router.get('/lista-completa', async (req, res) => {
    if (!req.session || !req.session.usuarioId) {
        return res.status(401).json({ error: 'Usuario no autenticado' });
    }

    try {
        const listaCompleta = await Cliente.findAll({
            where: {
                usuario_id: req.session.usuarioId
            }
        });
        console.log('Lista de clientes:', listaCompleta);
        res.status(200).json({ message: 'Lista de clientes encontrada.', listaCompleta });
    } catch (error) {
        console.error('Error al obtener la lista de clientes:', error);
        res.status(500).json({ error: 'Error al obtener la lista de clientes' });
    }
});


router.get('/cliente/:codigo', async (req, res) => {
    const {codigo} = req.params;

    try {
        const cliente = await Cliente.findOne({
            where: {
                codigo: codigo
            }
        });
        console.log('Cliente:', cliente);
        res.status(200).json({ message: 'Cliente encontrado', cliente });
    } catch (error) {
        console.error('Error al obtener cliente:', error);
        res.status(500).json({ message: 'Error al encontrar cliente' });
    }
});



router.put('/eliminar/:id', async(req,res) => {
    const {id} = req.params;

    try{
        await Cliente.update({
            listo: true
        },
        {where:{id: id},
        });
        res.status(200).json({ message: 'Cliente borrado exitosamente' });
    } catch(error){
        console.error(error);
        res.status(500).json({ message: 'Error al borrar cliente' });
    }
});

export default router;