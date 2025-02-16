import express from 'express';
import UsuariosController from '../../controllers/usuariosController.js';
import autorizarUsuarios from '../../middlewares/autorizarUsuarios.js';


const router = express.Router();
const usuariosController = new UsuariosController();


router.get('/', autorizarUsuarios([1]), usuariosController.buscarTodos);
router.get('/:idUsuario', usuariosController.buscarPorId);
//router.get('correoElectronico', usuariosController.buscarPorEmail);
//router.post('/crear', usuariosController.crearUsuario);
router.post('/crear', autorizarUsuarios([1]), usuariosController.crearUsuario);
// router.patch('/modificar/:idUsuario', usuariosController.modificar);

export {router};

