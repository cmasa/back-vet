const express = require('express');
const router = express.Router();
const controller = require('../controllers/consultas.controller');
const { validateConsulta } = require('../middlewares/consultasValidator');
const { handleValidation } = require('../middlewares/handleValidation');

router.get('/:id', controller.getConsulta);
router.get('/mascota/:id', controller.getConsultasByMascota);
router.delete('/:id', controller.deleteConsulta);

router.post(
    '/',
    validateConsulta,
    handleValidation,
    controller.createConsulta
);

router.put(
    '/:id',
    validateConsulta,
    handleValidation,
    controller.updateConsulta
);

module.exports = router;