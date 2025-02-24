import Usuarios from "../database/usuarios.js";
import Oficinas from "../database/oficinas.js";

export default class UsuariosService {

    constructor(){
        this.usuarios = new Usuarios();
        this.oficinas = new Oficinas();
    }

    buscarTodos = () => {
        return this.usuarios.buscarTodos();
    }

    buscarPorId = (idUsuario) => {
        return this.usuarios.buscarPorId(idUsuario);
    }

    buscar = (correoElectronico, contrasenia) => {
        return this.usuarios.buscar(correoElectronico, contrasenia);
    }

    buscarPorEmail = (correoElectronico) => {
        return this.usuarios.buscarPorEmail(correoElectronico);
    }
/*
    crearUsuario = (nombre, apellido, correoElectronico, contrasenia, idUsuarioTipo, imagen) => {
        return this.usuarios.crearUsuario(nombre, apellido, correoElectronico, contrasenia, idUsuarioTipo, imagen);
    }
*/
    crearUsuarioAdm = (nombre, apellido, correoElectronico, contrasenia, idUsuarioTipo, imagen) => {
        return this.usuarios.crearUsuarioAdm(nombre, apellido, correoElectronico, contrasenia, idUsuarioTipo, imagen);
    }

    crearUsuarioClt = (nombre, apellido, correoElectronico, contrasenia, idUsuarioTipo, imagen) => {
        return this.usuarios.crearUsuarioClt(nombre, apellido, correoElectronico, contrasenia, idUsuarioTipo, imagen);
    }

    crearUsuarioEe = async ({ nombre, apellido, correoElectronico, contrasenia, idUsuarioTipo, imagen, idOficina }) => {
        return this.usuarios.crearUsuarioEe({ nombre, apellido, correoElectronico, contrasenia, idUsuarioTipo, imagen, idOficina
        });
    };

    registrar = (nombre, apellido, correoElectronico, contrasenia, idUsuarioTipo, imagen) => {
        return this.usuarios.registrar(nombre, apellido, correoElectronico, contrasenia, idUsuarioTipo, imagen);
    }

    modificar = async (idUsuario, datos) => {

        const existe = await this.usuarios.buscarPorId(idUsuario);
        if (existe === null) {
            return {estado: false, mensaje: 'idUsuario no existe'};
        }    

        const mod = await this.usuarios.modificar(idUsuario, datos);
        if (mod){
            return {estado: true, mensaje: 'Usuario modificado'};
        }else{
            return {estado: false, mensaje: 'Usuario no modificado'};
        }
    }

    modificarUsuario = async (idUsuario, datos) => {

        const existe = await this.usuarios.buscarPorId(idUsuario);
        if (existe === null) {
            return {estado: false, mensaje: 'idUsuario no existe'};
        }    

        const mod = await this.usuarios.modificarUsuario(idUsuario, datos);
        if (mod){
            return {estado: true, mensaje: 'Usuario modificado'};
        }else{
            return {estado: false, mensaje: 'Usuario no modificado'};
        }
    }

    modificarUsuarioEe = async (idUsuario, datos) => {
        const usuarioExiste = await this.usuarios.buscarPorId(idUsuario);
        if (!usuarioExiste) {
            return { estado: false, mensaje: 'El usuario no existe.' };
        }
    
        // Verificar si la oficina existe antes de actualizarla
        if (datos.idOficina !== undefined) {
            const oficinaExiste = await this.oficinas.buscarPorId(datos.idOficina);
            if (!oficinaExiste) {
                return { estado: false, mensaje: 'La oficina especificada no existe.' };
            }
        }
    
        // Modificar usuario en `usuarios`
        const usuarioModificado = await this.usuarios.modificarUsuarioEe(idUsuario, datos, datos.idOficina);
    
        if (!usuarioModificado) {
            return { estado: false, mensaje: 'No se pudo modificar el usuario.' };
        }
    
        return { estado: true, mensaje: 'Usuario modificado correctamente.' };
    };
    
    eliminarUsuarioEe = async (idUsuario) => {
        const usuarioExiste = await this.usuarios.buscarPorId(idUsuario);
        if (!usuarioExiste) {
            return { estado: false, mensaje: 'El usuario no existe.' };
        }
    
        const eliminado = await this.usuarios.eliminarUsuarioEe(idUsuario);
        
        if (!eliminado) {
            return { estado: false, mensaje: 'No se pudo eliminar el usuario.' };
        }
    
        return { estado: true, mensaje: 'Usuario eliminado correctamente.' };
    };
    

    verPerfil = (idUsuario) => {
        return this.usuarios.verPerfil(idUsuario)
    }
    
    actualizarPerfil = async (idUsuario, datos) => {

        const existe = await this.usuarios.buscarPorId(idUsuario);
        if (existe === null) {
            return {estado: false, mensaje: 'idUsuario no existe'};
        }    

        const mod = await this.usuarios.actualizarPerfil(idUsuario, datos);
        if (mod){
            return {estado: true, mensaje: 'Perfil actualizado'};
        }else{
            return {estado: false, mensaje: 'Perfil actualizado'};
        }
    }
}