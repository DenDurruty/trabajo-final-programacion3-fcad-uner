import ReclamosEstados from '../database/reclamosEstados.js';

export default class ReclamosEstadosService{

    constructor() {
        this.reclamosEstados = new ReclamosEstados();
    }

    buscarTodos = () => {
        return this.reclamosEstados.buscarTodos();
    }

    buscarPorId = (idReclamoEstado) => {
        return this.reclamosEstados.buscarPorId(idReclamoEstado);
    }

    crear = (reclamoEstado) => {
        return this.reclamosEstados.crear(reclamoEstado);
    }

    modificar = (reclamoEstado) => {
        return this.reclamosEstados.modificar(reclamoEstado)
    }
 
}

