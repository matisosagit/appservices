import { body, validationResult } from "express-validator";

export const validarCreacionCliente = [
    body('nombre').notEmpty().withMessage('El nombre es obligatorio'),
    body('descripcion').notEmpty().withMessage('La descripción es obligatoria'),
    body('telefono')
        .matches(/^(09)[0-9]{7}$/)
        .withMessage('El teléfono debe comenzar con 09 y tener 9 dígitos'),
    (req, res, next) => {
        const errores = validationResult(req);
        if (!errores.isEmpty()) {
            return res.status(400).json({ errores: errores.array() });
        }
        next();
    }
];

export const validarEdicionCliente = [
    body('nombre').optional().notEmpty().withMessage('El nombre no puede estar vacío'),
    body('descripcion').optional().notEmpty().withMessage('La descripción no puede estar vacía'),
    body('telefono')
        .optional()
        .matches(/^(09)[0-9]{7}$/)
        .withMessage('El teléfono debe comenzar con 09 y tener 9 dígitos'),
    body('estado')
        .optional()
        .notEmpty().withMessage('El estado no puede estar vacío')
        .isIn(['Pendiente', 'En Proceso', 'Finalizado'])
        .withMessage('El estado debe ser Pendiente, En Proceso o Finalizado'),
    (req, res, next) => {
        const errores = validationResult(req);
        if (!errores.isEmpty()) {
            return res.status(400).json({ errores: errores.array() });
        }
        next();
    }
];
