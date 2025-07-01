require('dotenv').config();
const express = require('express');
const path = require('path');
const pool = require('./src/config/db.mysql');
const mascotasRoutes = require('./src/routes/mascotas.routes');
const familiasRoutes = require('./src/routes/familias.routes');
const consultasRoutes = require('./src/routes/consultas.routes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para parsear JSON
app.use(express.json());

//CORS
const cors = require('cors');
app.use(cors());

app.get('/ping', async (req, res) => {
    try {
        const result = await pool.query('SELECT now()');
        res.status(200).json({
            status: 'success',
            message: 'Pong!',
            data: result[0],
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Error al ejecutar la consulta',
            error: error.message,
        });
    }
});

// Rutas
app.use('/mascotas', mascotasRoutes);
app.use('/familias', familiasRoutes);
app.use('/consultas', consultasRoutes);

app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});