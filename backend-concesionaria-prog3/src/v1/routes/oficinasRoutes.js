import express from 'express';
import OficinasController from '../../controllers/oficinasController.js';
import autorizarUsuarios from '../../middlewares/autorizarUsuarios.js';

const router = express.Router();
const oficinasController = new OficinasController();

// autorizarUsuarios por ROLES:
// 1 = administrador
// 2 = empleado
// 3 = cliente 

// Rutas autorizadas solo para los usuarios administradores
router.get('/', autorizarUsuarios([1]) , oficinasController.buscarTodos);
router.get('/:idOficina', autorizarUsuarios([1]) , oficinasController.buscarPorId);
router.post('/crear', autorizarUsuarios([1]), oficinasController.crear);
router.patch('/modificar/:idOficina', autorizarUsuarios([1]), oficinasController.modificar);
router.delete('/eliminar/:idOficina', autorizarUsuarios([1]), oficinasController.eliminar);


export {router};