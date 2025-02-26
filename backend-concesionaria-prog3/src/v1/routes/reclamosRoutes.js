import express from 'express';
import ReclamosController from '../../controllers/reclamosController.js';
import autorizarUsuarios from '../../middlewares/autorizarUsuarios.js';

const router = express.Router();
const reclamosController = new ReclamosController();

// autorizarUsuarios por ROLES:
// 1 = administrador
// 2 = empleado
// 3 = cliente 

// Rutas autorizadas para los usuarios clientes
router.post('/crear', autorizarUsuarios([3]), reclamosController.crear);
router.get('/mis-reclamos/:idUsuario', autorizarUsuarios([3]), reclamosController.buscarPorCliente);
router.post('/cancelar/:idReclamo', autorizarUsuarios([3]), reclamosController.cancelacionReclamo);

// Rutas autorizadas para los usuarios empleados
router.get('/reclamos-oficina/:idOficina', autorizarUsuarios([2]), reclamosController.buscarPorOficina);
router.post('/atender/:idReclamo', autorizarUsuarios([2]), reclamosController.atencionReclamo);
router.post('/finalizar/:idReclamo', autorizarUsuarios([2]), reclamosController.finalizacionReclamo);
router.patch('/modificar/:idReclamo', autorizarUsuarios([2]), reclamosController.modificar);

// Rutas autorizadas para los usuarios administradores
router.get('/informe', reclamosController.informe);
router.get('/informe', autorizarUsuarios([1]), reclamosController.informe);


export {router};
