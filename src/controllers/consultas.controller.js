const service = require('../services/consultas.service');

exports.getConsulta = async (req, res) => {
    try {
        const consulta = await service.getById(req.params.id);
        if (!consulta)
            return res.status(404).json({ error: 'Consulta no encontrada.' });
        res.json(consulta);
    } catch (err) {
        res.status(500).json({ error: 'Error al intentar recuperar registro de Consulta.' });
    }
};

exports.getConsultasByMascota = async (req, res) => {
    try {
        const consultas = await service.getByMascota(req.params.id);
        if (consultas.length===0){
            return res.status(404).json({ error: 'Consulta no encontrada.' });
        }
        res.json(consultas);
    } catch (err) {
        res.status(500).json({ error: 'Error al intentar recuperar registros de Consultas.' });
        console.error(err);
    }
};

exports.createConsulta = async (req, res) => {
    try {
        const newConsulta = await service.create(req.body);
        res.status(201).json(newConsulta);
    } catch (err) {
        res.status(500).json({ error: 'Error al dar de alta la Consulta.' });
        console.error(err);
    }
};

exports.updateConsulta = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const updated = await service.update(id, req.body);
        res.json(updated);
    } catch (err) {
        res.status(500).json({ error: 'Error al actualizar el registro de la Consulta.' });
        console.error(err);
    }
};

exports.deleteConsulta = async (req, res) => {
    try {
        const deleted = await service.remove(req.params.id);
        res.json(deleted);
    } catch (err) {
        res.status(500).json({ error: 'Error al eliminar el registro.' });
    }
};