import express from 'express';
import ReclamosController from '../../controllers/reclamosController.js';
import autorizarUsuarios from '../../middlewares/autorizarUsuarios.js';

const router = express.Router();
const reclamosController = new ReclamosController();

router.get('/', reclamosController.buscarTodos);
router.get('/:idReclamo', reclamosController.buscarPorId);
router.post('/crear', autorizarUsuarios([3]), reclamosController.crear);
router.patch('/modificar/:idReclamo', reclamosController.modificar);
router.post('/cancelar/:idReclamo', autorizarUsuarios([3]), reclamosController.cancelacionReclamo);
router.post('/atender/:idReclamo', reclamosController.atencionReclamo);
router.get('/informe',  reclamosController.informe);
//router.get('/informe?formato=csv',  reclamosController.informe);


export {router};
