import express from 'express';
import multer from 'multer';
import { storage } from '../../config/multer.js';
import UsuariosController from '../../controllers/usuariosController.js';
import autorizarUsuarios from '../../middlewares/autorizarUsuarios.js';


const router = express.Router();
const usuariosController = new UsuariosController();
const upload = multer( { storage } );

// autorizarUsuarios por ROLES:
// 1 = administrador
// 2 = empleado
// 3 = cliente 

// Rutas autorizadas para todos los usuarios 
router.get('/mi-perfil', autorizarUsuarios([1,2,3]), usuariosController.verPerfil);
router.patch('/mi-perfil-actualizar/:idUsuario', upload.single('imagen'), autorizarUsuarios([1,2,3]), usuariosController.actualizarPerfil);

// Rutas autorizadas solo para los administradores
router.get('/', autorizarUsuarios([1]), usuariosController.buscarTodos);
router.get('/:idUsuario', autorizarUsuarios([1]), usuariosController.buscarPorId);

router.post('/crearUsuarioAdm', autorizarUsuarios([1]), usuariosController.crearUsuarioAdm);
router.post('/crearUsuarioClt', autorizarUsuarios([1]), usuariosController.crearUsuarioClt);
router.patch('/:idUsuario', autorizarUsuarios([1]), usuariosController.modificarUsuario); 
router.patch('/modificar/:idUsuario', autorizarUsuarios([1]), usuariosController.modificarUsuarioEe); 
router.delete('/eliminar/:idUsuario', autorizarUsuarios([1]), usuariosController.eliminarUsuarioEe); 

//router.patch('modificar/:idUsuario', upload.single('imagen'), autorizarUsuarios([1]), usuariosController.modificar); 
router.post('/crearUsuarioEe', autorizarUsuarios([1]), usuariosController.crearUsuarioEe); // Crear usuario empleado y asignar oficina a la que pertenece

//router.patch('/:idUsuario', upload.single('imagen'), autorizarUsuarios([1]), usuariosController.modificarUsuarioEe); 

export {router};

// router.patch('/modificar/:idUsuario', usuariosController.modificar);