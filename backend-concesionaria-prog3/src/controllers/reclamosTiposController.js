import ReclamosTiposService from '../services/reclamosTiposService.js';

export default class ReclamosTiposController{

    constructor() {
        this.service = new ReclamosTiposService();
    }

    buscarTodos = async (req, res) => {
        try {
            const reclamosTipos = await this.service.buscarTodos();
            res.status(200).send(reclamosTipos)
        } catch (error) {
            console.log(error);
            res.status(500).send ({
                estado:"Falla", mensaje:"Error interno en el servidor."
            });
        }
    }

    buscarPorId = async (req, res) => {
        const idReclamoTipo = req.params.idReclamoTipo;

        if (idReclamoTipo === undefined) {
            return res.status(400).send({
                estado:"Falla",
                mensaje: "Faltan datos obligatorios."    
            })
        }

        try{
            const reclamoTipo = await this.service.buscarPorId(idReclamoTipo);
            res.status(200).send({estado: 'OK' , data: reclamoTipo})

        }catch (error){
            console.log(error);
            res.status(500).send({
                estado:"Falla", mensaje: "Error interno en servidor."
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
            const reclamoTipo = {
                descripcion,
                activo
            }

            const nuevoReclamoTipo = await this.service.crear(reclamoTipo);
            res.status(201).send({
                estado:"OK", data: nuevoReclamoTipo
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
        const idReclamoTipo = req.params.idReclamoTipo;
    
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
            const reclamoTipo = {
                idReclamoTipo,  
                descripcion,
                activo
            };
    
            const modifReclamoTipo = await this.service.modificar(reclamoTipo);
            res.status(201).send({
                estado: "OK",
                data: modifReclamoTipo
            });
    
        } catch (error) {
            console.log(error);
            res.status(500).send({
                estado: "Falla",
                mensaje: "Error interno en servidor."
            });
        }
    }

    eliminar = async (req, res) => {
        const idReclamoTipo = req.params.idReclamoTipo;
    
        if (!idReclamoTipo) {
            return res.status(400).send({
                estado: "Falla",
                mensaje: "Se requiere el id del reclamo a eliminar."
            });
        }
    
        try {
            const resultado = await this.service.eliminar(idReclamoTipo);
    
            return res.status(resultado.status).send({
                estado: resultado.status === 200 ? "OK" : "Falla",
                mensaje: resultado.json.mensaje
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
