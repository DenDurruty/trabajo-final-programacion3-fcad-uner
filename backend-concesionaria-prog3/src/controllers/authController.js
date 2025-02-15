import UsuariosService from '../services/usuariosService.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';


import dotenv from 'dotenv';
dotenv.config();

export default class AuthController {

    registrar = async (req, res) => {
        try {

            const { nombre, apellido, correoElectronico, contrasenia, idUsuarioTipo, imagen } = req.body;
    
            
            if (!nombre || !apellido || !correoElectronico || !contrasenia || !idUsuarioTipo) {
                return res.status(400).json({ mensaje: 'Faltan datos obligatorios para el registro.' });
            }
/*
            const usuarioExiste = await UsuariosService.buscarPorEmail(correoElectronico);
            console.log("usuarioExiste:", usuarioExiste);

            if (usuarioExiste) {
                return res.status(409).json({ message: 'Este usuario ya existe' });
            }
*/    
           
            const hashedPassword = await bcrypt.hash(contrasenia, 10);
           
            const usuariosService = new UsuariosService();
    
            const usuarioNuevo = await usuariosService.registrar({
                nombre,
                apellido,
                correoElectronico,
                contrasenia: hashedPassword,
                idUsuarioTipo,
                imagen
            });
    
            if (!usuarioNuevo) {
                return res.status(500).json({ mensaje: 'Error al registrar el usuario.' });
            }

            const token = jwt.sign(usuarioNuevo, process.env.JWT_SECRET, { expiresIn: '1h' });
            return res.status(201).json({ mensaje: 'Usuario registrado con éxito.', usuario: usuarioNuevo, token: token });

        } catch (error) {
            console.error('Error en el controlador de registro:', error);
            return res.status(500).json({ mensaje: 'Error interno del servidor.' });
        }
    };

    login = async (req, res) => {
        try {
            const { correoElectronico, contrasenia } = req.body;
            if (!correoElectronico || !contrasenia) {
                return res.status(400).json({ estado: "Falla", mensaje: "Faltan datos obligatorios." });
            }

            const usuariosService = new UsuariosService();
            const usuario = await usuariosService.buscar(correoElectronico, contrasenia);

            const verificarContraseña = await bcrypt.compare(contrasenia, usuario.contrasenia);
            if (!verificarContraseña) {
                return res.status(400).json({ estado: "Falla", mensaje: "Contraseña incorrecta." });
            }

            const token = jwt.sign(usuario, process.env.JWT_SECRET, { expiresIn: '1h' });
            return res.status(201).json({ mensaje: 'Bienvenido', token: token });

         } catch (error) {
            console.error('Intente mas tarde', error);
            return res.status(500).json({ mensaje: 'Error interno del servidor.Intente mas tarde' });

        }

    };

}