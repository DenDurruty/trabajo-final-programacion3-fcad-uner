import OficinasService from "../services/oficinasService.js";

export default class OficinasController{

    constructor(){
        this.service = new OficinasService
    }

    buscarTodos = async (req, res) => {
        try {
            const oficinas = await this.service.buscarTodos();
            res.status(200).send(oficinas)
        } catch (error) {
            console.log(error);
            res.status(500).send ({
                estado:"Falla", mensaje:"Error interno en el servidor."
            });
        }
    }

    buscarPorId = async (req, res) => {
        const idOficina = req.params.idOficina;

        if (idOficina === undefined) {
            return res.status(400).send({
                estado:"Falla",
                mensaje: "Faltan datos obligatorios."    
            })
        }

        try{
            const oficina = await this.service.buscarPorId(idOficina);
            res.status(200).send({estado: 'OK' , data: oficina})

        }catch (error){
            console.log(error);
            res.status(500).send({
                estado:"Falla", mensaje: "Error interno en servidor."
            });
        }
    }

    crear = async (req, res) => {
        const { nombre, idReclamoTipo} = req.body;

        if (!nombre) {
            return res.status(400).send({
                estado:"Falla",
                mensaje:"Se requiere el campo nombre."
            })
        }

        try{
            const oficina = {
                nombre,
                idReclamoTipo
            }

            const nuevaOficina = await this.service.crear(oficina);
            if (!nuevaOficina) {
                return res.status(400).send({
                    estado: "Falla",
                    mensaje: "No se pudo crear la oficina. Verifique que el nombre no esté duplicado o que el idReclamoTipo sea válido."
                });
            }

            res.status(201).send({
                estado: "OK",
                data: nuevaOficina
            });

        }catch (error){
            console.log(error);
            res.status(500).send({
                estado:"Falla", mensaje: "Error interno en servidor."
            });
        } 
    }

    modificar = async (req, res) => {
        try {
            const idOficina = req.params.idOficina;
            const { nombre, idReclamoTipo } = req.body;
    
            if (!idOficina) {
                return res.status(400).json({ estado: "Falla", mensaje: "Falta el ID de la oficina." });
            }
    
            let datosModificados = {};
            if (nombre !== undefined) datosModificados.nombre = nombre;
            if (idReclamoTipo !== undefined) datosModificados.idReclamoTipo = idReclamoTipo;
    
            if (Object.keys(datosModificados).length === 0) {
                return res.status(400).json({ estado: "Falla", mensaje: "No se enviaron datos válidos para modificar." });
            }
    
            datosModificados.idOficina = idOficina;
    
            const resultado = await this.service.modificar(datosModificados);
    
            if (resultado.estado === false) {
                return res.status(404).json({ estado: "Falla", mensaje: resultado.mensaje });
            }
    
            return res.status(200).json({ estado: "OK", data: resultado });
    
        } catch (error) {
            console.error("Error en modificar:", error);
            return res.status(500).json({ estado: "Falla", mensaje: "Error interno del servidor." });
        }
    };

    eliminar = async (req, res) => {
        const idOficina = req.params.idOficina;
    
        if (!idOficina) {
            return res.status(400).send({
                estado: "Falla",
                mensaje: "Se requiere el id de la oficina a eliminar."
            });
        }
    
        try {
            const resultado = await this.service.eliminar(idOficina);
    
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