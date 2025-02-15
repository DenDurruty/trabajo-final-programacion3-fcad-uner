import express from 'express';
import ReclamosController from '../../controllers/reclamosController.js';

const router = express.Router();
const reclamosController = new ReclamosController();

router.get('/', reclamosController.buscarTodos);
router.get('/:idReclamo', reclamosController.buscarPorId);
router.post('/crear', reclamosController.crear);
router.patch('/modificar/:idReclamo', reclamosController.modificar);
router.post('/atender/:idReclamo', reclamosController.atencionReclamo);


export {router};
