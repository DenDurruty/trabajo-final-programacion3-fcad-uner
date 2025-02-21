import express from 'express';
import ReclamosController from '../../controllers/reclamosController.js';
import autorizarUsuarios from '../../middlewares/autorizarUsuarios.js';

const router = express.Router();
const reclamosController = new ReclamosController();

router.get('/', reclamosController.buscarTodos);
router.get('/:idReclamo', reclamosController.buscarPorId);
router.get('/mis-reclamos/:idUsuario', autorizarUsuarios([3]), reclamosController.buscarPorCliente);
router.get('/reclamos-oficina/:idOficina', autorizarUsuarios([2]), reclamosController.buscarPorOficina);
router.post('/crear', autorizarUsuarios([3]), reclamosController.crear);
router.patch('/modificar/:idReclamo', reclamosController.modificar);
router.post('/cancelar/:idReclamo', autorizarUsuarios([3]), reclamosController.cancelacionReclamo);
router.post('/atender/:idReclamo', autorizarUsuarios([2]), reclamosController.atencionReclamo);
router.post('/finalizar/:idReclamo', autorizarUsuarios([2]), reclamosController.finalizacionReclamo);
router.get('/informe',  reclamosController.informe);
//router.get('/informe?formato=csv',  reclamosController.informe);


export {router};
