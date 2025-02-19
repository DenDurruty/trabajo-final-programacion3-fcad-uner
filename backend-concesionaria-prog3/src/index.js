import express from 'express';
import { conn } from './database/conn.js';
import dotenv from 'dotenv';
import morgan from 'morgan';
import cors from 'cors';

import { router as v1ReclamosEstadoRouter } from './v1/routes/reclamosEstadosRoutes.js';
import { router as v1ReclamosRouter } from './v1/routes/reclamosRoutes.js';
import { router as v1OficinasRouter } from './v1/routes/oficinasRoutes.js';
import { router as v1UsuariosRouter } from './v1/routes/usuariosRoutes.js';
import { router as v1AuthRouter } from './v1/routes/authRoutes.js';

//import validateContentType from './middlewares/validateContentType.js';
import autenticarUsuario from './middlewares/autenticarUsuarios.js';

import fs from 'fs';
import path  from 'path';
import { fileURLToPath } from 'url';




dotenv.config();

// Iniciar la app
const app = express();

// Middlewares
app.use(express.json());
app.use(cors()); 
//app.use(validateContentType);

// morgan
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'accesos.log'), { flags: 'a' });
app.use(morgan('combined', { stream: accessLogStream }));


// Rutas
app.get('/', (req, res) => {
    res.send('Gestión de reclamos')
    //res.json({'estado':true});
});

app.use('/api/v1/reclamos-estados', v1ReclamosEstadoRouter);
app.use('/api/v1/reclamos', v1ReclamosRouter);
app.use('/api/v1/oficinas', v1OficinasRouter);
app.use('/api/v1/usuarios', autenticarUsuario, v1UsuariosRouter);
app.use('/api/v1/auth', v1AuthRouter);


// Probar conexión a base de datos
conn.getConnection(err => {
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
