import ReclamosEstados from '../database/reclamosEstados.js';

// Crear clase para definir los métodos que vamos a conectar
// Vamos a tener un constructor donde instanciaremos nuestra clase de base de datos para poder trabajar con sus métodos
// Vamos a utilizar esa instancia para BUSCAR todos los reclamos de estado
export default class ReclamosEstadosService{

    constructor() {
        this.reclamosEstados = new ReclamosEstados();
    }

    buscarTodos = () => {
        return this.reclamosEstados.buscarTodos();
    }

    crear = (reclamoEstado) => {
        return this.reclamosEstados.crear(reclamoEstado);
    }

    modificar = (reclamoEstado) => {
        return this.reclamosEstados.modificar(reclamoEstado)
    }

    


    
}

// Cuando utilicemos este servicio va a existir un método que me busca todos los reclamos de estado
/*
    consultarEstado = (consultarEstadoReclamo) => {
        return this.reclamosEstados.consultarEstado(consultarEstadoReclamo);
    } 
*/