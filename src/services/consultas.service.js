const pool = require('../config/db.mysql');

// Recupera un listado de Consultas en base al ID de la Mascota.
exports.getByMascota = async (id_dueno) => {
  const [rows] = await pool.query(`
    SELECT 
      *
    FROM consultas
    WHERE id_mascota = ?
      ORDER BY fecha_creacion DESC
  `,
  [id_dueno]);
  return rows;
};

// Recupera una consulta específica
exports.getById = async (id) => {
  const [rows] = await pool.query(
    `
    SELECT 
      *
    FROM consultas
    WHERE id = ?
  `,
    [id]
  );
  return rows[0];
};

// Agrega el registro de una nueva consulta a la BD
exports.create = async ({ id_mascota, motivo, notas }) => {
  const [result] = await pool.query(
    'INSERT INTO consultas (id_mascota, motivo, notas) VALUES (?, ?, ?)',
    [id_mascota, motivo, notas]
  );
  return { id: result.insertId, id_mascota, motivo, notas };
};

// Elimina el registro de una Consulta
exports.remove = async (id) => {
  await pool.query('DELETE FROM consultas WHERE id = ?', [id]);
  return { deleted: true };
};

// Actualiza el registro de una Consulta
exports.update = async (id, { id_mascota, motivo, notas }) => {
  await pool.query(
    'UPDATE consultas SET id_mascota = ?, motivo = ?, notas = ? WHERE id = ?',
    [id_mascota, motivo, notas, id]
  );
  return { id, id_mascota, motivo, notas };
};