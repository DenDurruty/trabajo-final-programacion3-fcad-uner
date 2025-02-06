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

    crear = async (req, res) => {
        const { descripcion, activo } = req.body;

        if (!descripcion) {
            return res.status(400).send({
                estado:"Falla",
                mensaje:"Se requiere el campo de descripción."
            })
        }

        if (activo === undefined || activo === null) {
            return res.status(400).send({
                estado:"Falla",
                mensaje:"Se requiere el campo de descripción."
            })
        }

        try{
            const reclamoEstado = {
                descripcion,
                activo
            }

            const nuevoReclamoEstado = await this.service.crear(reclamoEstado);
            res.status(201).send({
                estado:"OK", data: nuevoReclamoEstado
            });

        }catch (error){
            console.log(error);
            res.status(500).send({
                estado:"Falla", mensaje: "Error interno en servidor."
            });
        } 
    }
    modificar = async (req, res) => {
        const { descripcion, activo } = req.body;
        const idReclamoEstado = req.params.idReclamoEstado;
    
        if (!descripcion) {
            return res.status(400).send({
                estado: "Falla",
                mensaje: "Se requiere el campo de descripción."
            });
        }
    
        if (activo === undefined || activo === null) {
            return res.status(400).send({
                estado: "Falla",
                mensaje: "Se requiere el campo activo."
            });
        }
    
        try {
            const reclamoEstado = {
                idReclamoEstado,  // Asegurando que el idReclamoEstado se pase al servicio
                descripcion,
                activo
            };
    
            const modifReclamoEstado = await this.service.modificar(reclamoEstado);
            res.status(201).send({
                estado: "OK",
                data: modifReclamoEstado
            });
    
        } catch (error) {
            console.log(error);
            res.status(500).send({
                estado: "Falla",
                mensaje: "Error interno en servidor."
            });
        }
    }
}


    /*
    consultarEstado = async (req, res) => {
        const { idReclamoEstado } = req.params;
        const { idUsuario } = req.query;
        
        try {
            const consultarEstadoReclamo = await this.service.consultarEstado();
            res.status(200).send(consultarEstadoReclamo)
        } catch (error) {
            console.log(error);
            res.status(500).send ({
                estado:"Falla", mensaje:"Error interno en el servidor."
            });
        }
    }
    */
