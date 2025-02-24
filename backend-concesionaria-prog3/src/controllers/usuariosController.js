import bcrypt from 'bcryptjs';
import UsuariosService from "../services/usuariosService.js";

export default class UsuariosController{

    constructor(){
        this.usuariosService = new UsuariosService();
    }

    buscarTodos = async (req, res) => {
        try{
            const usuarios = await this.usuariosService.buscarTodos();
            res.status(200).send(usuarios)

        }catch (error){
            console.log(error);
            res.status(500).send({
                estado:"Falla", mensaje: "Error interno en servidor."
            });
        }
    }

    buscarPorId = async (req, res) => {
        const idUsuario = req.params.idUsuario;

        if (idUsuario === undefined) {
            return res.status(400).send({
                estado:"Falla",
                mensaje: "Faltan datos obligatorios."    
            })
        }

        try{
            const usuario = await this.usuariosService.buscarPorId(idUsuario);
            res.status(200).send({estado: 'OK' , data: usuario})

        }catch (error){
            console.log(error);
            res.status(500).send({
                estado:"Falla", mensaje: "Error interno en servidor."
            });
        }
    }

    crearUsuario = async (req, res) => {

        try { 
            const { nombre, apellido, idUsuarioTipo, correoElectronico, contrasenia } = req.body;

            // Limitar datos obligatorios
            if (!idUsuarioTipo || !nombre || !apellido || !correoElectronico || !contrasenia) {
                return res.status(400).json({ mensaje: 'Faltan datos obligatorios para el registro.' });
            };

            // Verificar existencia de usuario
            const usuarioExiste = await this.usuariosService.buscarPorEmail(correoElectronico);
            if (usuarioExiste) {
                return res.status(409).json({ message: 'Este usuario ya existe.' });
            };
            
            // Hashear contraseña
            const contraseniaHasheada = await bcrypt.hash(contrasenia, 10);
            
            // Crear usuario
            const usuarioNuevo = await this.usuariosService.crearUsuario({
                ...req.body,
                contrasenia: contraseniaHasheada
            });
            
            res.status(201).json(usuarioNuevo);
        
        } catch (error){
            console.log(error)
            res.status(500).send({
                estado:"Falla", mensaje: "Error interno en servidor."
            });
        }
    }

    crearUsuarioAdm = async (req, res) => {

        try { 
            const { nombre, apellido, correoElectronico, contrasenia } = req.body;

            // Limitar datos obligatorios
            if (!nombre || !apellido || !correoElectronico || !contrasenia) {
                return res.status(400).json({ mensaje: 'Faltan datos obligatorios para el registro.' });
            };

            // Verificar existencia de usuario
            const usuarioExiste = await this.usuariosService.buscarPorEmail(correoElectronico);
            if (usuarioExiste) {
                return res.status(409).json({ message: 'Este usuario ya existe.' });
            };
            
            // Hashear contraseña
            const contraseniaHasheada = await bcrypt.hash(contrasenia, 10);
            
            // Crear usuario
            const usuarioNuevo = await this.usuariosService.crearUsuarioAdm({
                ...req.body,
                contrasenia: contraseniaHasheada
            });
            
            // Validar creación del usuario
            if (!usuarioNuevo) {
                return res.status(500).json({ mensaje: 'No se pudo crear el usuario.' });
            }
            res.status(201).json({ mensaje: 'Usuario ADMINISTRADOR creado exitosamente', usuario: usuarioNuevo });
        
        } catch (error){
            console.log(error)
            res.status(500).send({
                estado:"Falla", mensaje: "Error interno en servidor."
            });
        }
    }

    crearUsuarioClt = async (req, res) => {

        try { 
            const { nombre, apellido, correoElectronico, contrasenia } = req.body;

            // Limitar datos obligatorios
            if (!nombre || !apellido || !correoElectronico || !contrasenia) {
                return res.status(400).json({ mensaje: 'Faltan datos obligatorios para el registro.' });
            };

            // Verificar existencia de usuario
            const usuarioExiste = await this.usuariosService.buscarPorEmail(correoElectronico);
            if (usuarioExiste) {
                return res.status(409).json({ message: 'Este usuario ya existe.' });
            };
            
            // Hashear contraseña
            const contraseniaHasheada = await bcrypt.hash(contrasenia, 10);
            
            // Crear usuario
            const usuarioNuevo = await this.usuariosService.crearUsuarioClt({
                ...req.body,
                contrasenia: contraseniaHasheada
            });

            // Validar creación del usuario
            if (!usuarioNuevo) {
                return res.status(500).json({ mensaje: 'No se pudo crear el usuario.' });
            }
            res.status(201).json({ mensaje: 'Usuario CLIENTE creado exitosamente', usuario: usuarioNuevo });
            
        
        } catch (error){
            console.log(error)
            res.status(500).send({
                estado:"Falla", mensaje: "Error interno en servidor."
            });
        }
    }

    crearUsuarioEe = async (req, res) => {
        try {
          const { nombre, apellido, correoElectronico, contrasenia, idOficina } = req.body;
      
          // Validar datos obligatorios
          if (!nombre || !apellido || !correoElectronico || !contrasenia) {
            return res.status(400).json({ mensaje: 'Faltan datos obligatorios para el registro.' });
          }
      
          // Verificar existencia de usuario
          const usuarioExiste = await this.usuariosService.buscarPorEmail(correoElectronico);
          if (usuarioExiste) {
            return res.status(409).json({ mensaje: 'Este usuario ya existe.' });
          }
      
          // Hashear la contraseña
          const contraseniaHasheada = await bcrypt.hash(contrasenia, 10);
      
          // Crear usuario
          const usuarioNuevo = await this.usuariosService.crearUsuarioEe({
            nombre,
            apellido,
            correoElectronico,
            contrasenia: contraseniaHasheada,
            idUsuarioTipo: 2,
            imagen: null, 
            idOficina,
          });
      
          // Validar creación del usuario
          if (!usuarioNuevo) {
            return res.status(500).json({ mensaje: 'No se pudo crear el usuario.' });
          }
          res.status(201).json({ mensaje: 'Usuario EMPLEADO creado exitosamente', usuario: usuarioNuevo });

        } catch (error) {
          console.error(error);
          res.status(500).send({
            estado: "Falla",
            mensaje: "Error interno en el servidor.",
          });
        }
    };

    modificar = async (req, res) => {
        try{
            const idUsuario = req.params.idUsuario;

            if(idUsuario === undefined ){
                return res.status(400).send({
                    estado:"Falla",
                    mensaje: "Faltan datos obligatorios."    
                })
            }
            const imagen  = req.file ? req.file.filename : null;            
            const datos = { ...req.body, imagen}; 

            // const datos = req.body;

            if (Object.keys(datos).length === 0) {
                return res.status(400).send({
                    estado:"Falla",
                    mensaje: "No se enviaron datos para ser modificados."    
                });
            }

            const usuarioModificado = await this.usuariosService.modificar(idUsuario, datos);
            
            if (usuarioModificado.estado){
                res.status(200).send({estado:"OK", mensaje: usuarioModificado.mensaje});
            }else{
                res.status(404).send({estado:"Falla", mensaje: usuarioModificado.mensaje});
            }

        }catch (error){
            console.log(error)
            res.status(500).send({
                estado:"Falla", mensaje: "Error interno en servidor."
            });
        }
    }

    modificarUsuario = async (req, res) => {
        try {
            const idUsuario = req.params.idUsuario;
    
            if (!idUsuario) {
                return res.status(400).send({
                    estado: "Falla",
                    mensaje: "Faltan datos obligatorios."    
                });
            }
    
            const usuarioActual = await this.usuariosService.buscarPorId(idUsuario);
            if (!usuarioActual) {
                return res.status(404).send({
                    estado: "Falla",
                    mensaje: "El usuario no existe."    
                });
            }
    
            const datos = req.body;
    
            // Campos que puede modificar el admin
            let datosPermitidos = {};
            
            if (datos.idUsuarioTipo) {
                datosPermitidos.idUsuarioTipo = datos.idUsuarioTipo;
            }
            
            if (datos.idOficina) {
                datosPermitidos.idOficina = datos.idOficina;
            }
    
            if (Object.keys(datosPermitidos).length === 0) {
                return res.status(400).send({
                    estado: "Falla",
                    mensaje: "No se enviaron datos válidos para modificar."
                });
            }
    
            const usuarioModificado = await this.usuariosService.modificarUsuario(idUsuario, datosPermitidos);
            
            if (usuarioModificado.estado) {
                res.status(200).send({ estado: "OK", mensaje: usuarioModificado.mensaje });
            } else {
                res.status(404).send({ estado: "Falla", mensaje: usuarioModificado.mensaje });
            }
    
        } catch (error) {
            console.log(error);
            res.status(500).send({
                estado: "Falla", 
                mensaje: "Error interno en el servidor."
            });
        }
    }

    modificarUsuarioEe = async (req, res) => {
        try {
            const { idUsuario } = req.params;
            if (!idUsuario) {
                return res.status(400).json({ estado: "Falla", mensaje: "Falta el id del usuario." });
            }
    
            const { idUsuarioTipo, idOficina } = req.body;
            let datosPermitidos = {};
            if (idUsuarioTipo !== undefined) datosPermitidos.idUsuarioTipo = idUsuarioTipo;
            if (idOficina !== undefined) datosPermitidos.idOficina = idOficina;
    
            if (Object.keys(datosPermitidos).length === 0) {
                return res.status(400).json({ estado: "Falla", mensaje: "No se enviaron datos válidos para modificar." });
            }
    
            const resultado = await this.usuariosService.modificarUsuarioEe(idUsuario, datosPermitidos);
    
            if (resultado.estado) {
                return res.status(200).json({ estado: "OK", mensaje: resultado.mensaje, data: datosPermitidos });
            } else {
                return res.status(400).json({ estado: "Falla", mensaje: resultado.mensaje });
            }
        } catch (error) {
            console.error("Error en modificarUsuarioEe:", error);
            return res.status(500).json({ estado: "Falla", mensaje: "Error interno del servidor." });
        }
    };

    eliminarUsuarioEe = async (req, res) => {
        try {
            const { idUsuario } = req.params;
            if (!idUsuario) {
                return res.status(400).json({ estado: "Falla", mensaje: "Falta el id del usuario." });
            }
    
            const resultado = await this.usuariosService.eliminarUsuarioEe(idUsuario);
    
            if (resultado.estado) {
                return res.status(200).json({ estado: "OK", mensaje: resultado.mensaje });
            } else {
                return res.status(400).json({ estado: "Falla", mensaje: resultado.mensaje });
            }
        } catch (error) {
            console.error("Error en eliminarUsuario:", error);
            return res.status(500).json({ estado: "Falla", mensaje: "Error interno del servidor." });
        }
    };
    
    verPerfil = async (req, res) => {
        console.log("Usuario autenticado:", req.user); // 👀 Ver qué hay en req.user
    
        const idUsuario = req.user?.idUsuario; // Aseguramos que req.user exista
    
        if (!idUsuario) {
            return res.status(401).send({
                estado: "Falla",
                mensaje: "No autorizado. No se encontró el usuario autenticado."
            });
        }
    
        try {
            const perfil = await this.usuariosService.verPerfil(idUsuario);
    
            if (!perfil) {
                return res.status(404).send({ estado: "Falla", mensaje: "Perfil no encontrado." });
            }
    
            res.status(200).send({ estado: "OK", perfil: perfil });
        } catch (error) {
            console.log(error);
            res.status(500).send({
                estado: "Falla",
                mensaje: "Error interno en servidor."
            });
        }
    };

    actualizarPerfil = async (req, res) => {
        try{
            const idUsuario = req.params.idUsuario;
            const { correoElectronico } = req.body;
            const imagen  = req.file ? req.file.filename : null;       

            // Crear objeto   
            const datos = {};
            if (correoElectronico) datos.correoElectronico = correoElectronico;
            if (imagen) datos.imagen = imagen;

            // Validar datos
            if (Object.keys(datos).length === 0) {
                return res.status(400).send({
                    estado:"Falla",
                    mensaje: "No se enviaron datos para ser modificados."    
                });
            }

            // Verificar existencia de usuario
            const usuarioExiste = await this.usuariosService.buscarPorEmail(correoElectronico);
            if (usuarioExiste) {
                return res.status(409).json({ message: 'Este usuario ya existe.' });
            };

            const perfilActualizado = await this.usuariosService.actualizarPerfil(idUsuario, datos);
            
            if (perfilActualizado.estado){
                res.status(200).send({estado:"OK", mensaje: perfilActualizado.mensaje});
            }else{
                res.status(404).send({estado:"Falla", mensaje: perfilActualizado.mensaje});
            }

        }catch (error){
            console.log(error)
            res.status(500).send({
                estado:"Falla", mensaje: "Error interno en servidor."
            });
        }
    }
    

}    