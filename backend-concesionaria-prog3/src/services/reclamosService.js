import Reclamos from "../database/reclamos.js";

export default class ReclamosService {

    constructor(){
        this.reclamos = new Reclamos();
    }

    buscarTodos = () => {
        return this.reclamos.buscarTodos();
    }

    buscarPorId = (idReclamo) => {
        return this.reclamos.buscarPorId(idReclamo);
    }
    
    crear = async (reclamo) => {
        const reclamoCreado = await this.reclamos.crear(reclamo);
        if (!reclamoCreado) {
            return {estado: false, mensaje: "Reclamo no creado"};
        }
        return {estado: true, mensaje: "Reclamo creado", data: reclamoCreado};
    }

    modificar = async (idReclamo, datos) => {
        const existe = await this.reclamos.buscarPorId(idReclamo);
        if (existe === null) {
            return {estado: false, mensaje: "idReclamo no existe"};
        }

        await this.reclamos.modificar(idReclamo, datos);
        return {estado: true, mensaje:"Reclamo modificado"};
    }

}
