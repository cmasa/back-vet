const pool = require('../config/db.mysql');

// Recupera un listado de Dueños
exports.getAll = async () => {
  const [rows] = await pool.query(`
    SELECT 
      id, 
      nombre, 
      apellido,
      telefono,
      direccion,
      email,
      inactivo
    FROM duenos
    WHERE inactivo = 0
    Order by apellido, nombre
    `);
  return rows;
};

// Recupera un Dueño en particular
exports.getById = async (id) => {
  const [rows] = await pool.query(
    `
    SELECT 
      id, 
      nombre, 
      apellido,
      telefono,
      direccion,
      email,
      inactivo
    FROM duenos 
    WHERE id = ?
  `,
    [id]
  );
  return rows[0];
};

// Recupera un listado de Familias.
// Permite buscar por Nombre o Apellido de la Familia.
exports.getByNames = async (name) => {
  const like = `%${name}%`;
  const [rows] = await pool.query(`
    SELECT 
      id, 
      nombre, 
      apellido,
      telefono,
      direccion,
      email,
      inactivo
    FROM duenos 
    WHERE nombre LIKE ?
      OR  apellido LIKE ?
      ORDER BY apellido, nombre
  `,
  [like, like]);
  return rows;
};

// Agrega el registro de una nueva familia a la BD
exports.create = async ({ nombre, apellido, telefono, direccion, email }) => {
  const [result] = await pool.query(
    'INSERT INTO duenos (nombre, apellido, telefono, direccion, email) VALUES (?, ?, ?, ?, ?)',
    [nombre, apellido, telefono, direccion, email]
  );
  return { id: result.insertId, nombre, apellido, telefono, direccion, email };
};

// Elimina el registro de una Familia
exports.remove = async (id) => {
  await pool.query('DELETE FROM duenos WHERE id = ?', [id]);
  return { deleted: true };
};

// Actualiza el registro de una Familia
exports.update = async (id, { nombre, apellido, telefono, direccion, email }) => {
  await pool.query(
    'UPDATE duenos SET nombre = ?, apellido = ?, telefono = ?, direccion = ?, email = ? WHERE id = ?',
    [nombre, apellido, telefono, direccion, email, id]
  );
  return { id, nombre, apellido, telefono, direccion, email };
};

// Actualiza el campo INACTIVO de una familia
exports.updateInactivo = async (id, { inactivo }) => {
  await pool.query(
    'UPDATE duenos SET inactivo = ? WHERE id = ?',
    [inactivo, id]
  );
  return { id, inactivo };
};