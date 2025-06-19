const { body } = require('express-validator');
const pool = require('../config/db.mysql');

exports.validateConsulta = [
    body('id_mascota')
        .notEmpty().withMessage('El campo id_mascota es obligatorio')
        .isInt({ gt: 0 }).withMessage('Debe ser un número entero positivo')
        .custom(async (value) => {
            const [rows] = await pool.query('SELECT id FROM mascotas WHERE id = ?', [value]);
            if (rows.length === 0) {
                throw new Error('La mascota especificada no existe');
            }
            return true;
        }),

    body('motivo')
        .trim()
        .notEmpty().withMessage('El motivo es obligatorio'),

    body('notas')
        .trim()
        .notEmpty().withMessage('El campo notas es obligatorio'),
];
