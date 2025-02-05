import ReclamosEstadosService from '../services/reclamosEstadosService.js';

// Crear una clase 
// En su constructor instanciamos el servicio desde reclamosEstadosService
// Utilizamos el método buscarTodos, en este caso sí voy a tener parámetros porque el controlador
// tiene que manejar los datos de la solicitud y además tiene que responder al cliente
export default class ReclamosEstadosController{

    constructor() {
        this.service = new ReclamosEstadosService();
    }

    buscarTodos = async (req, res) => {
        try {
            const reclamosEstados = await this.service.buscarTodos();
            res.status(200).send(reclamosEstados)
        } catch (error) {
            console.log(error);
            res.status(500).send ({
                estado:"Falla", mensaje:"Error interno en el servidor."
            });
        }
    }
}

