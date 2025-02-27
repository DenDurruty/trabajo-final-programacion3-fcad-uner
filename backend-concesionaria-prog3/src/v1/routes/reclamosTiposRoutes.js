import express from 'express';
import ReclamosTiposController from '../../controllers/reclamosTiposController.js';
import autorizarUsuarios from '../../middlewares/autorizarUsuarios.js';

const router = express.Router();
const reclamosTiposController = new ReclamosTiposController();

// autorizarUsuarios por ROLES:
// 1 = administrador
// 2 = empleado
// 3 = cliente 

// Rutas autorizadas sólo para los usuarios administradores
router.get('/', autorizarUsuarios([1]) , reclamosTiposController.buscarTodos);
router.get('/:idReclamoTipo', autorizarUsuarios([1]) ,reclamosTiposController.buscarPorId);
router.post('/crear', autorizarUsuarios([1]), reclamosTiposController.crear);
router.patch('/modificar/:idReclamoTipo', autorizarUsuarios([1]), reclamosTiposController.modificar);
router.delete('/eliminar/:idReclamoTipo', autorizarUsuarios([1]), reclamosTiposController.eliminar);


export { router };