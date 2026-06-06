import { Router } from 'express';
import * as cliente from '../controladores/clienteControllers.js';
import * as clienteValidators from '../validators/clienteValidators.js';

const router = Router();

router.post('/crear-cliente', clienteValidators.validarCreacionCliente, cliente.crearCliente);

router.put('/editar/:id', clienteValidators.validarEdicionCliente, cliente.editarCliente);

router.get('/lista', cliente.listaClientes);

router.get('/lista-completa', cliente.historialClientes);

router.get('/cliente/:codigo', cliente.obtenerClientePorCodigo);

router.put('/eliminar/:id', cliente.eliminarCliente);


export default router;