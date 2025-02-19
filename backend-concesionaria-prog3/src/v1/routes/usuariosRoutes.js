import express from 'express';
import multer from 'multer';
import { storage } from '../../config/multer.js';
import UsuariosController from '../../controllers/usuariosController.js';
import autorizarUsuarios from '../../middlewares/autorizarUsuarios.js';


const router = express.Router();
const usuariosController = new UsuariosController();
const upload = multer( { storage } );


router.get('/', autorizarUsuarios([1]), usuariosController.buscarTodos);
router.get('/:idUsuario', usuariosController.buscarPorId);
//router.get('correoElectronico', usuariosController.buscarPorEmail);
//router.post('/crear', usuariosController.crearUsuario);
//router.post('/crear', autorizarUsuarios([1]), usuariosController.crearUsuario);
router.post('/crearUsuarioAdm', autorizarUsuarios([1]), usuariosController.crearUsuarioAdm);
router.post('/crearUsuarioClt', autorizarUsuarios([1]), usuariosController.crearUsuarioClt);
router.post('/crearUsuarioEe', autorizarUsuarios([1]), usuariosController.crearUsuarioEe);
// router.patch('/modificar/:idUsuario', usuariosController.modificar);
router.patch('/:idUsuario', upload.single('imagen'), autorizarUsuarios([1,2]), usuariosController.modificar);

export {router};

