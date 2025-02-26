import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import swaggerAutogen from 'swagger-autogen';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const swaggerAutogenInstance = swaggerAutogen();

const doc = {
  info: {
    title: 'API REST - Programación 3 - 2024',
    description: 'API REST para la gestión de reclamos de la concesionaria de automóviles Prog.III.',
  },
  host: 'localhost:3000',
  schemes: ['http'],
 
};

const outputFile = join(__dirname, 'swagger.json');
const endpointsFiles = [join(__dirname, '../v1/routes/*.js')];


