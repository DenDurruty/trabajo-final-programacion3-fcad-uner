import ReclamosService from "../services/reclamosService.js";

export default class ReclamosController{

    constructor(){
        this.reclamosService = new ReclamosService();
    }

    buscarTodos = async (req, res) => {
        try{
            const reclamos = await this.reclamosService.buscarTodos();
            res.status(200).send(reclamos)

        }catch (error){
            console.log(error);
            res.status(500).send({
                estado:"Falla", mensaje: "Error interno en servidor."
            });
        }
    }

    buscarPorId = async (req, res) => {
        const idReclamo = req.params.idReclamo;

        if (idReclamo === undefined) {
            return res.status(400).send({
                estado:"Falla",
                mensaje: "Faltan datos obligatorios."    
            })
        }

        try{
            const reclamo = await this.reclamosService.buscarPorId(idReclamo);
            res.status(200).send({estado: 'OK' , data: reclamo})

        }catch (error){
            console.log(error);
            res.status(500).send({
                estado:"Falla", mensaje: "Error interno en servidor."
            });
        }
    }
    
    // no recibo el idReclamoEstado, al crear un nuevo reclamo siempre sera de tipo 1 "creado"
    // fechaCreado lo hago con NOW() de mysql
    crear = async (req, res) => {
        const { asunto, idReclamoTipo, idUsuarioCreador } = req.body;
        
        if (asunto === undefined || idReclamoTipo === undefined || idUsuarioCreador === undefined) {
            return res.status(400).send({
                estado:"Falla",
                mensaje: "Faltan datos obligatorios."    
            })
        }
        
        try{
            const reclamo = {
                asunto, 
                idReclamoTipo, 
                idUsuarioCreador
            }

            const nuevoReclamo = await this.reclamosService.crear(reclamo);
            res.status(201).send({
                estado:"OK", data: nuevoReclamo
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
            const idReclamo = req.params.idReclamo;
            if(idReclamo === undefined) {
                return res.status(400).send({
                    estado:"Falla",
                    mensaje:"Faltan datos obligatorios."
                })
            }

            const datos = req.body;

            if (Object.keys(datos).length === 0) {
                return res.status(400).send({
                    estado:"Falla",
                    mensaje:"No se enviaron datos para ser modificados."
                });
            }

            const reclamoModificado = await this.reclamosService.modificar(idReclamo, datos);

            if (reclamoModificado.estado){
                res.status(200).send({estado:"Ok", mensaje: reclamoModificado.mensaje});
            }else{
                res.status(404).send({estado:"Falla", mensaje: reclamoModificado.mensaje});
            }

        }catch (error) {
            console.log(error)
            res.status(500).send({
                estado:"Falla", mensaje:"Error interno en servidor."

            });
        }
    }
}
