const service = require('../services/familias.service');

exports.getAll = async (req, res) => {
    try {
        const familias = await service.getAll();
        res.json(familias);
    } catch (err) {
        res.status(500).json({ error: 'Error al obtener listado.' });
        console.log(err);
    }
};

exports.getFamilia = async (req, res) => {
    try {
        const familia = await service.getById(req.params.id);
        if (!familia)
            return res.status(404).json({ error: 'Familia no encontrada.' });
        res.json(familia);
    } catch (err) {
        res.status(500).json({ error: 'Error al intentar recuperar registro de Familia.' });
    }
};

exports.getFamiliasByNames = async (req, res) => {
    try {
        const familias = await service.getByNames(req.params.name);
        if (familias.length===0){
            return res.status(404).json({ error: 'Familia no encontrada.' });
        }
        res.json(familias);
    } catch (err) {
        res.status(500).json({ error: 'Error al intentar recuperar registros de Familias.' });
        console.error(err);
    }
};

exports.createFamilia = async (req, res) => {
    try {
        const newFamilia = await service.create(req.body);
        res.status(201).json(newFamilia);
    } catch (err) {
        res.status(500).json({ error: 'Error al dar de alta la Familia.' });
        console.error(err);
    }
};

exports.updateFamilia = async (req, res) => {
    try {
        const updated = await service.update(req.params.id, req.body);
        res.json(updated);
    } catch (err) {
        res.status(500).json({ error: 'Error al actualizar el registro de la Familia.' });
        console.error(err);
    }
};

exports.updateInactivo = async (req, res) => {
    try {
        const updated = await service.updateInactivo(req.params.id, req.body);
        res.json(updated);
    } catch (err) {
        res.status(500).json({ error: 'Error al actualizar el registro de la Familia.' });
        console.error(err);
    }
};

exports.deleteFamilia = async (req, res) => {
    try {
        const deleted = await service.remove(req.params.id);
        res.json(deleted);
    } catch (err) {
        res.status(500).json({ error: 'Error al eliminar el registro.' });
    }
};