class Usuario {
    constructor (id, nombre, apellido, correoElectronico, contrasenia, idUsuarioTipo, imagen, activo) {
        this.id = id;
        this.nombre = nombre;
        this.apellido = apellido;
        this.correoElectronico = correoElectronico;
        this.contrasenia = contrasenia;
        this.idUsuarioTipo = idUsuarioTipo;
        this.imagen = imagen;
        this.activo = activo;
    }
}

export {Usuario};