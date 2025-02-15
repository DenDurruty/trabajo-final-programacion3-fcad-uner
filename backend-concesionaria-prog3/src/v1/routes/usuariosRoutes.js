import express from 'express';
import UsuariosController from '../../controllers/usuariosController.js';

const router = express.Router();
const usuariosController = new UsuariosController();

router.get('/', usuariosController.buscarTodos);
router.get('/:idUsuario', usuariosController.buscarPorId);
//router.get('correoElectronico', usuariosController.buscarPorEmail);
router.post('/crear', usuariosController.crearUsuario);
// router.patch('/modificar/:idUsuario', usuariosController.modificar);

export {router};