const { validationResult } = require('express-validator');

exports.handleValidation = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            //errores: errors.array().map(err => ({ campo: err.param, mensaje: err.msg })),
            errores: errors.array(),
        });
    }
    next();
};