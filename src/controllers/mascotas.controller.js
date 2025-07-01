const service = require('../services/mascotas.service');

exports.getAll = async (req, res) => {
    try {
        const mascotas = await service.getAll();
        res.json(mascotas);
    } catch (err) {
        res.status(500).json({ error: 'Error al obtener listado.' });
        console.log(err);
    }
};

exports.getMascota = async (req, res) => {
    try {
        const mascota = await service.getById(req.params.id);
        if (!mascota)
            return res.status(404).json({ error: 'Mascota no encontrada.' });
        res.json(mascota);
    } catch (err) {
        res.status(500).json({ error: 'Error al intentar recuperar registro de Mascota.' });
        console.log(err);
    }
};

exports.getByFamilia = async (req, res) => {
  try {
    const mascotas = await service.getByFamilia(req.params.idFamilia);
    res.json(mascotas);
  } catch (err) {
    res.status(500).json({ error: 'Error al recuperar mascotas' });
  }
};

exports.getMascotasByNames = async (req, res) => {
    try {
        const mascotas = await service.getByNames(req.params.name);
        if (mascotas.length===0){
            return res.status(404).json({ error: 'Mascota no encontrada.' });
        }
        res.json(mascotas);
    } catch (err) {
        res.status(500).json({ error: 'Error al intentar recuperar registros de Mascotas.' });
        console.error(err);
    }
};

exports.createMascota = async (req, res) => {
    try {
        const newMascota = await service.create(req.body);
        res.status(201).json(newMascota);
    } catch (err) {
        res.status(500).json({ error: 'Error al dar de alta la Mascota.' });
        console.error(err);
    }
};

exports.updateMascota = async (req, res) => {
    try {
        const updated = await service.update(req.params.id, req.body);
        res.json(updated);
    } catch (err) {
        res.status(500).json({ error: 'Error al actualizar el registro de la Mascota.' });
        console.error(err);
    }
};

exports.deleteMascota = async (req, res) => {
    try {
        const deleted = await service.remove(req.params.id);
        res.json(deleted);
    } catch (err) {
        res.status(500).json({ error: 'Error al eliminar el registro.' });
    }
};