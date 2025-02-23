import express from 'express';
import ReclamosEstadosController from '../../controllers/reclamosEstadosController.js';

const router = express.Router();
const reclamosEstadosController = new ReclamosEstadosController();

// autorizarUsuarios por ROLES:
// 1 = administrador
// 2 = empleado
// 3 = cliente 

// Rutas autorizadas para todos los usuarios 
router.get('/', reclamosEstadosController.buscarTodos);
router.get('/:idReclamoEstado', reclamosEstadosController.buscarPorId);
router.post('/crear', reclamosEstadosController.crear);
router.patch('/modificar/:idReclamoEstado', reclamosEstadosController.modificar);
//router.patch('/cancelar/:idReclamo', reclamosEstadosController.cancelar);
//router.get('/consultarEstado', reclamosEstadosController.consultarEstado);


export { router };

