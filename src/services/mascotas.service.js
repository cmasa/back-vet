const pool = require('../config/db.mysql');

// Recupera un listado de Mascotas, con el apellido de su Familia
exports.getAll = async () => {
  const [rows] = await pool.query(`
    SELECT 
      m.id, 
      m.nombre as paciente, 
      m.especie, 
      m.raza,
      m.peso,
      m.edad,
      m.id_dueno,
      d.apellido,
      d.nombre
    FROM duenos d 
    INNER JOIN mascotas m
    ON d.id = m.id_dueno
    Where m.inactivo = 0
    Order by d.apellido, m.nombre
    `);
  return rows;
};

// Recupera un listado de Mascotas, en base al ID de su Familia
exports.getByFamilia = async (idFamilia) => {
  const [rows] = await pool.query(
    `SELECT id, nombre, especie, raza, edad, peso FROM mascotas WHERE id_dueno = ?`,
    [idFamilia]
  );
  return rows;
};

// Recupera un listado de Mascotas, con el apellido de su Familia.
// Permite buscar por Nombre de la Mascota o su dueño.
exports.getByNames = async (name) => {
  const like = `%${name}%`;
  const [rows] = await pool.query(`
    SELECT 
      m.id, 
      m.nombre as paciente, 
      m.especie, 
      m.raza, 
      m.id_dueno,
      m.inactivo,
      d.apellido,
      d.nombre
    FROM duenos d 
    INNER JOIN mascotas m
    ON d.id = m.id_dueno
    WHERE m.nombre LIKE ?
      OR d.nombre LIKE ?
      OR d.apellido LIKE ?
      ORDER BY d.apellido, m.nombre
  `,
    [like, like, like]);
  return rows;
};

exports.getById = async (id) => {
  const [rows] = await pool.query(
    `
    SELECT 
      id, 
      nombre, 
      especie, 
      raza,
      peso,
      edad,
      id_dueno
      FROM mascotas
      WHERE id = ?
  `,
    [id]
  );
  return rows[0];
};

// Agrega el registro de una nueva mascota a la BD
exports.create = async ({ nombre, especie, raza, edad, peso, id_dueno }) => {
  const [result] = await pool.query(
    'INSERT INTO mascotas (nombre, especie, raza, edad, peso, id_dueno) VALUES (?, ?, ?, ?, ?, ?)',
    [nombre, especie, raza, edad, peso, id_dueno]
  );
  return { id: result.insertId, nombre, especie, raza, edad, peso, id_dueno };
};

// Elimina el registro de una Mascota
exports.remove = async (id) => {
  await pool.query('DELETE FROM mascotas WHERE id = ?', [id]);
  return { deleted: true };
};

// Actualiza el registro de una Mascota
exports.update = async (id, { nombre, especie, raza, edad, peso }) => {
  await pool.query(
    'UPDATE mascotas SET nombre = ?, especie = ?, raza = ?, edad = ?, peso = ? WHERE id = ?',
    [nombre, especie, raza, edad, peso, id]
  );
  return { id, nombre, especie, raza, edad, peso };
};