const express = require('express');
const router = express.Router();
const controller = require('../controllers/mascotas.controller');
const { validateMascota } = require('../middlewares/mascotasValidator');
const { handleValidation } = require('../middlewares/handleValidation');

router.get('/', controller.getAll);
router.get('/:id', controller.getMascota);
router.get('/buscar/:name', controller.getMascotasByNames);
router.get('/familia/:idFamilia', controller.getByFamilia);
router.delete('/:id', controller.deleteMascota);

router.post(
    '/',
    validateMascota,
    handleValidation,
    controller.createMascota
);

router.put(
    '/:id',
    validateMascota,
    handleValidation,
    controller.updateMascota
);

module.exports = router;