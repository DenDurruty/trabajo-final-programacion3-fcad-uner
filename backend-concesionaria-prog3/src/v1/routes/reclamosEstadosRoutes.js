import express from 'express';
import ReclamosEstadosController from '../../controllers/reclamosEstadosController.js';

// Definir las rutas que van a esperar
const router = express.Router();

const reclamosEstadosController = new ReclamosEstadosController()
;

router.get('/', reclamosEstadosController.buscarTodos);

export { router };
// Cuando me pidan todos los reclamos de estado, asigno este controlador a este método.
