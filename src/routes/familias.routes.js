const express = require('express');
const router = express.Router();
const controller = require('../controllers/familias.controller');
const { validateFamilia } = require('../middlewares/familiasValidator');
const { handleValidation } = require('../middlewares/handleValidation');

router.get('/', controller.getAll);
router.get('/:id', controller.getFamilia);
router.get('/buscar/:name', controller.getFamiliasByNames);
router.put('/inactivar/:id', controller.updateInactivo);
router.delete('/:id', controller.deleteFamilia);

router.post(
    '/',
    validateFamilia,
    handleValidation,
    controller.createFamilia
);

router.put(
    '/:id',
    validateFamilia,
    handleValidation,
    controller.updateFamilia
);

module.exports = router;