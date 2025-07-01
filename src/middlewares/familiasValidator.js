const { body } = require('express-validator');

exports.validateFamilia = [
    body('nombre')
        .trim()
        .notEmpty().withMessage('El nombre es obligatorio')
        .matches(/^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]+$/).withMessage('El nombre sólo debe contener letras y espacios'),

    body('apellido')
        .trim()
        .notEmpty().withMessage('El apellido es obligatorio')
        .matches(/^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]+$/).withMessage('El apellido sólo debe contener letras y espacios'),

    body('telefono')
        .trim()
        .notEmpty().withMessage('El teléfono es obligatorio'),

    body('email')
        .optional({ checkFalsy: true })
        .isEmail().withMessage('Debe ser un email válido'),
];
