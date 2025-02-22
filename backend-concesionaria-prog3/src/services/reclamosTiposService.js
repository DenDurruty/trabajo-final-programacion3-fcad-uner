import ReclamosTipos from '../database/reclamosTipos.js';

export default class ReclamosTiposService{

    constructor() {
        this.reclamosTipos = new ReclamosTipos();
    }

    buscarTodos = () => {
        return this.reclamosTipos.buscarTodos();
    }

    buscarPorId = (idReclamoTipo) => {
        return this.reclamosTipos.buscarPorId(idReclamoTipo);
    }

    crear = (reclamoTipo) => {
        return this.reclamosTipos.crear(reclamoTipo);
    }

    modificar = (reclamoTipo) => {
        return this.reclamosTipos.modificar(reclamoTipo);
    }

    eliminar = (idReclamoTipo) => {
        return this.reclamosTipos.eliminar(idReclamoTipo);
    }
    
}