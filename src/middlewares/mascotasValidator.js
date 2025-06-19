const { body } = require('express-validator');
const pool = require('../config/db.mysql');

exports.validateMascota = [
    body('nombre')
        .trim()
        .notEmpty().withMessage('El nombre es obligatorio')
        .matches(/^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]+$/).withMessage('El nombre sólo debe contener letras y espacios'),

    body('especie')
        .notEmpty().withMessage('La especie es obligatoria')
        .customSanitizer(value => value.toLowerCase()) // Convierte a minúscula antes de validar
        .isIn(['perro', 'gato', 'otros']).withMessage('La especie debe ser "perro", "gato" u "otros".'),

    body('peso')
        .optional({ checkFalsy: true })
        .isFloat({ min: 0 }).withMessage('El peso debe ser un número válido.'),

    body('edad')
        .optional({ checkFalsy: true })
        .isInt({ min: 0 }).withMessage('La edad debe ser un número válido.'),

    body('id_dueno')
        .notEmpty().withMessage('El ID de la familia es obligatorio')
        .isInt({ gt: 0 }).withMessage('Debe ser un número entero positivo')
        .custom(async (value) => {
            const [rows] = await pool.query('SELECT id FROM duenos WHERE id = ?', [value]);
            if (rows.length === 0) {
                throw new Error('El ID de familia no existe.');
            }
            return true;
        })
];
