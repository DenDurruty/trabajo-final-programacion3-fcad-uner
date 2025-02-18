import UsuariosService from '../services/usuariosService.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';


import dotenv from 'dotenv';
dotenv.config();

export default class AuthController {

    registrar = async (req, res) => {
        try {

            const { nombre, apellido, correoElectronico, contrasenia, idUsuarioTipo, imagen } = req.body;
    
            // Limitar datos obligatorios
            if (!nombre || !apellido || !correoElectronico || !contrasenia) {
                return res.status(400).json({ mensaje: 'Faltan datos obligatorios para el registro.' });
            }

            // Validar fuerza de la contraseña
            const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.,])[A-Za-z\d@$!%*?&.,]{8,}$/;

            if (!passwordRegex.test(contrasenia)) {
                return res.status(400).json({
                    mensaje: 'La contraseña debe tener al menos 8 caracteres, incluyendo una mayúscula, una minúscula, un número y un carácter especial.'
                });
                
            }

            // Verificar existencia de usuario
            const usuarioPorEmail = new UsuariosService();
            const usuarioExiste = await usuarioPorEmail.buscarPorEmail(correoElectronico);
            console.log("usuarioExiste:", usuarioExiste);

            if (usuarioExiste) {
                return res.status(409).json({ message: 'Este usuario ya existe.' });
            }
        
            // Determinar el tipo de usuario: cliente, por defecto
            let tipoUsuario = 3;
           
            // Hashear contraseña
            const hashedPassword = await bcrypt.hash(contrasenia, 10);
           
            // Registrar usuario
            const usuariosRegis = new UsuariosService();
            const usuarioNuevo = await usuariosRegis.registrar({
                nombre,
                apellido,
                correoElectronico,
                contrasenia: hashedPassword,
                idUsuarioTipo: tipoUsuario,
                imagen
            });
    
            if (!usuarioNuevo) {
                return res.status(500).json({ mensaje: 'Error al registrar el usuario.' });
            }
            
            // Generar token para el nuevo
            const payload = {idUsuario: usuarioNuevo.id, idUsuarioTipo: usuarioNuevo.idUsuarioTipo}
            const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
            return res.status(201).json({ mensaje: 'Usuario registrado con éxito.', correoElectronico, token: token });

        } catch (error) {
            console.error('Error en el controlador de registro:', error);
            return res.status(500).json({ mensaje: 'Error interno del servidor.' });
        }
    };

    login = async (req, res) => {
        try {

            const { correoElectronico, contrasenia } = req.body;

            // Limitar datos obligatorios
            if (!correoElectronico || !contrasenia) {
                return res.status(400).json({ estado: "Falla", mensaje: "Faltan datos obligatorios." });
            }

            // Verificar existencia de usuario
            const usuarioPorEmail = new UsuariosService();
            const usuarioExiste = await usuarioPorEmail.buscarPorEmail(correoElectronico);

            if (!usuarioExiste) {
                return res.status(400).json({ estado: 'falla', mensaje: 'Solicitud incorrecta.' });
            }
            
            // Comparar contraseña
            const verificarContraseña = await bcrypt.compare(contrasenia, usuarioExiste.contrasenia);
            if (!verificarContraseña) {
                return res.status(400).json({ estado: "Falla", mensaje: "Solicitud incorrecta." });
            }

            // Generar token 
            const payload = {idUsuario: usuarioExiste.id, idUsuarioTipo: usuarioExiste.idUsuarioTipo}
            const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
            return res.status(201).json({ mensaje: 'Bienvenido', token: token });

         } catch (error) {
            console.error('Intente mas tarde', error);
            return res.status(500).json({ mensaje: 'Error interno del servidor. Intente mas tarde.' });

        }

    };


}