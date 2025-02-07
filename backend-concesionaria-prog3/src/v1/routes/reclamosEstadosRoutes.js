import express from 'express';
import ReclamosEstadosController from '../../controllers/reclamosEstadosController.js';

// Definir las rutas que van a esperar
const router = express.Router();

const reclamosEstadosController = new ReclamosEstadosController();

//router.get('/:idReclamoEstado', reclamosEstadosController.buscarPorId);
router.get('/', reclamosEstadosController.buscarTodos);
router.post('/crear', reclamosEstadosController.crear);
router.patch('/modificar/:idReclamoEstado', reclamosEstadosController.modificar);
// router.get('/consultarEstado', reclamosEstadosController.consultarEstado);
router.patch('/cancelar/:idReclamoEstado', reclamosEstadosController.cancelar); // Nueva ruta para cancelar


export { router };
// Cuando me pidan todos los reclamos de estado, asigno este controlador a este método.
