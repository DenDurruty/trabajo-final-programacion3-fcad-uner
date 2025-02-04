import express from 'express';
import { conn } from './database/conn.js';
import dotenv from 'dotenv';

dotenv.config();

// Iniciar el servidor
const app = express();

// Rutas
app.get('/', (req, res) => {
    res.send('Gestión de reclamos')
});

// Probar conexión a base de datos
conn.connect(err => {
    if (err) {
        console.error('❌ Error conectando a la base de datos:', err.message);
        process.exit(1);
    } else {
        console.log('✅ Conexión exitosa a MySQL');
    }
});

// Iniciar el puerto
const PUERTO = process.env.PUERTO || 3000;

app.listen(PUERTO, () => {
    console.log(`El servidor está esuchando en el puerto ${PUERTO}...`);
});
