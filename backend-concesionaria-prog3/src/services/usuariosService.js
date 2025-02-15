import Usuarios from "../database/usuarios.js";

export default class UsuariosService {

    constructor(){
        this.usuarios = new Usuarios();
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

    crearUsuario = (nombre, apellido, correoElectronico, contrasenia, idUsuarioTipo, imagen) => {
        return this.usuarios.crearUsuario(nombre, apellido, correoElectronico, contrasenia, idUsuarioTipo, imagen);
    }

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
}