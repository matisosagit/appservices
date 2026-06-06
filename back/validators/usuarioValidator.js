import { body, validationResult } from 'express-validator';

export const validarCreacionUsuario = [
    body('nombre').notEmpty().withMessage('El nombre es obligatorio'),
    body('contraseña')
        .isLength({ min: 6 })
        .withMessage('La contraseña debe tener al menos 6 caracteres'),
    body('correo').isEmail().withMessage('El correo debe ser válido'),
    body('telefono')
        .isMobilePhone()
        .withMessage('El teléfono debe ser un número de teléfono válido'),
    (req, res, next) => {
        const errores = validationResult(req);
        if (!errores.isEmpty()) {
            return res.status(400).json({ errores: errores.array() });
        }
        next();
    },
];

export const validarInicioSesion = [
    body('nombre').notEmpty().withMessage('El nombre es obligatorio'),
    body('contraseña')
        .notEmpty()
        .isLength({ min: 6 })
        .withMessage('La contraseña es obligatoria'),
    (req, res, next) => {
        const errores = validationResult(req);
        if (!errores.isEmpty()) {
            return res.status(400).json({ errores: errores.array() });
        }
        next();
    },
];

