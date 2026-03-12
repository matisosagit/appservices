import Cliente from "../modelos/cliente.js";

export const crearCliente = async (req, res) => {
    const usuarioId = req.session.usuarioId;
    if (!usuarioId) {
        return res.status(401).json({ message: 'Usuario no autenticado' });
    }
    const{nombre, descripcion, telefono} = req.body;
    const estadoC = "Pendiente";
    const codigoUnico = nanoid(10);
    const hoy = new Date();
    const fecha = hoy.toISOString().split("T")[0];

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
}

export const editarCliente = async (req, res) => {
    if (!req.session || !req.session.usuarioId) {
        return res.status(401).json({ message: 'Usuario no autenticado' });
    }

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
        return res.status(200).json({ message: 'Cliente editado exitosamente', clienteActualizado });
    } catch(error){
        console.error(error);
        return res.status(500).json({ message: 'Error al editar el cliente' });
    }
}

export const listaClientes = async (req, res) => {
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
        return res.status(200).json({ message: 'Lista exitosa.', listaClientes });
    } catch (error) {
        console.error('Error al obtener la lista de clientes:', error);
        res.status(500).json({ error: 'Error al obtener la lista de clientes' });
    }
}

export const historialClientes = async (req, res) => {
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
        return res.status(200).json({ message: 'Lista de clientes encontrada.', listaCompleta });
    } catch (error) {
        console.error('Error al obtener la lista de clientes:', error);
        res.status(500).json({ error: 'Error al obtener la lista de clientes' });
    }
}

export const obtenerClientePorCodigo = async (req, res) => {
    const {codigo} = req.params;

    try {
        const cliente = await Cliente.findOne({
            where: {
                codigo: codigo
            }
        });
        console.log('Cliente:', cliente);
        return res.status(200).json({ message: 'Cliente encontrado', cliente });
    } catch (error) {
        console.error('Error al obtener cliente:', error);
        res.status(500).json({ message: 'Error al encontrar cliente' });
    }
}

export const eliminarCliente = async (req, res) => {
    if (!req.session || !req.session.usuarioId) {
        return res.status(401).json({ error: 'Usuario no autenticado' });
    }

    const {id} = req.params;

    try{
        await Cliente.update({
            listo: true
        },
        {where:{id: id},
        });
        return res.status(200).json({ message: 'Cliente borrado exitosamente' });
    } catch(error){
        console.error(error);
        res.status(500).json({ message: 'Error al borrar cliente' });
    }
}