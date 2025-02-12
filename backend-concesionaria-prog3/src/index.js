import express from 'express';
import { conn } from './database/conn.js';
import dotenv from 'dotenv';
import { router as v1ReclamosEstadoRouter } from './v1/routes/reclamosEstadosRoutes.js';
import { router as v1ReclamosRouter } from './v1/routes/reclamosRoutes.js';
import { router as v1OficinasRouter } from './v1/routes/oficinasRoutes.js';
import validateContentType from './middlewares/validateContentType.js';

dotenv.config();

// Iniciar la app
const app = express();

// Middlewares
app.use(express.json());
app.use(validateContentType);

// Rutas
app.get('/', (req, res) => {
    res.send('Gestión de reclamos')
    res.json({'estado':true});
});

app.use('/api/v1/reclamos-estados', v1ReclamosEstadoRouter);
app.use('/api/v1/reclamos', v1ReclamosRouter);
app.use('/api/v1/oficinas', v1OficinasRouter);


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
    console.log(`El servidor está escuchando en el puerto ${PUERTO}...`);
});
