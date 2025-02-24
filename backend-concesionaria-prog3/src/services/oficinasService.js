import Oficinas from "../database/oficinas.js";

export default class OficinasService {

    constructor(){
        this.oficinas = new Oficinas();
    }

    buscarTodos = () => {
        return this.oficinas.buscarTodos();
    }

    buscarPorId = (idOficina) => {
        return this.oficinas.buscarPorId(idOficina);
    }

    crear = (oficina) => {
        return this.oficinas.crear(oficina);
    }

    modificar = (oficina) => {
        return this.oficinas.modificar(oficina);
    };

    eliminar = (idOficina) => {
        return this.oficinas.eliminar(idOficina);
    }

}