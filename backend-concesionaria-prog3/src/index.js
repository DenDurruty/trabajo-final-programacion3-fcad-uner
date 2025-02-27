import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import cors from 'cors';
import swaggerUi from "swagger-ui-express";
//import swaggerJsdoc from "swagger-jsdoc";
import YAML from 'yamljs';


import { router as v1ReclamosTiposRouter } from './v1/routes/reclamosTiposRoutes.js';
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


// Morgan
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'accesos.log'), { flags: 'a' });
app.use(morgan('combined', { stream: accessLogStream }));


// Rutas
app.get('/', (req, res) => { 
    res.send('Gestión de reclamos')
   
});

app.use('/api/v1/auth', v1AuthRouter);
app.use('/api/v1/usuarios', autenticarUsuario, v1UsuariosRouter);
app.use('/api/v1/oficinas', autenticarUsuario, v1OficinasRouter);
app.use('/api/v1/reclamos', autenticarUsuario, v1ReclamosRouter);
app.use('/api/v1/reclamos-tipos', autenticarUsuario, v1ReclamosTiposRouter);

// Swagger 
const swaggerDocument = YAML.load('./docs/swagger.yaml');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Iniciar el puerto
const PUERTO = process.env.PUERTO || 3000;

app.listen(PUERTO, () => {
    console.log(`El servidor está escuchando en el puerto ${PUERTO}...`);
});
