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
        const { correoElectronico, contrasenia } = req.body;

        const usuarioExiste = await this.usuariosService.buscarPorEmail(correoElectronico);
        if (usuarioExiste) {
            return res.status(409).json({ message: 'Este usuario ya existe' });
        };

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(contrasenia, salt);

        const usuarioNuevo = await this.usuariosService.crearUsuario({
            ...req.body,
            contrasenia: hashedPassword
        });
        res.status(201).json(usuarioNuevo);
    }

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
    
}    