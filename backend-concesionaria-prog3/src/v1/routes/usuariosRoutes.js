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

// Rutas autorizadas sólo para los usuarios administradores
router.get('/', autorizarUsuarios([1]), usuariosController.buscarTodos);
router.get('/:idUsuario', autorizarUsuarios([1]), usuariosController.buscarPorId);
router.post('/crearUsuarioAdm', autorizarUsuarios([1]), usuariosController.crearUsuarioAdm);
router.post('/crearUsuarioClt', autorizarUsuarios([1]), usuariosController.crearUsuarioClt); 
router.post('/crearUsuarioEe', autorizarUsuarios([1]), usuariosController.crearUsuarioEe); // Crear usuario empleado y asignar oficina a la que pertenece
router.patch('/modificar-usuarios/:idUsuario', autorizarUsuarios([1]), usuariosController.modificarUsuarios); 
router.delete('/eliminar-usuarios/:idUsuario', autorizarUsuarios([1]), usuariosController.eliminarUsuarios); 


export {router};
