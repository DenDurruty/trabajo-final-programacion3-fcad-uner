import ReclamosService from "../services/reclamosService.js";

const formatosPermitidos = ['pdf', 'csv'];

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

    buscarPorCliente = async (req, res) => {
        try {
            
            const idUsuario = req.params.idUsuario;
    
            // Instanciar la clase
            const reclamos = await this.reclamosService.buscarPorCliente(idUsuario);
    
            // Verificar si hay reclamos
            if (reclamos && reclamos.length > 0) {

                // Mapear datos 
                const datosReclamo = reclamos.map(reclamo => ({
                    idReclamo: reclamo.idReclamo,
                    asunto: reclamo.asunto,
                    tipo: reclamo.idReclamoTipo,
                    estado: reclamo.idReclamoEstado
                }));

                res.status(200).send({ estado: 'OK', mensaje: 'Mis reclamos:', datos: datosReclamo });

            } else {
                
                res.status(404).send({ estado: 'Falla', mensaje: 'No tienes reclamos realizados.' });
            }

        } catch (error) {

            res.status(500).send({ estado: "Falla", mensaje: "Error interno en servidor." });
        }
    };

    buscarPorOficina = async (req, res) => {
        try {
            
            const idOficina = req.params.idOficina;
    
            // Instanciar la clase
            const reclamos = await this.reclamosService.buscarPorOficina(idOficina);
    
            // Verificar si hay reclamos
            if (reclamos && reclamos.length > 0) {

               /* // Mapear datos 
                const datosReclamo = reclamos.map(reclamo => ({
                    idReclamo: reclamo.idReclamo,
                    asunto: reclamo.asunto,
                    tipo: reclamo.idReclamoTipo,
                    estado: reclamo.idReclamoEstado
                }));*/

                res.status(200).send({ estado: 'OK', mensaje: 'Todos los reclamos:', datos: reclamos });

            } else {
                
                res.status(404).send({ estado: 'Falla', mensaje: 'No tienes reclamos.' });
            }

        } catch (error) {

            res.status(500).send({ estado: "Falla", mensaje: "Error interno en servidor." });
        }
    };
    
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
    
    crear = async (req, res) => {
        const { asunto, idReclamoTipo, idUsuarioCreador } = req.body;
        
        if (asunto === undefined || idReclamoTipo === undefined || idUsuarioCreador === undefined) {
            return res.status(400).send({
                estado:"Falla", mensaje: "Faltan datos obligatorios."})
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

    cancelacionReclamo = async (req, res) => {
        try{
            const idReclamo = req.params.idReclamo;

            const dato = {
                idReclamoEstado: 3,
                fechaCancelado: new Date().toISOString().slice(0, 19).replace('T', ' ')  // yyyy-mm-dd hh:mm:ss
            };

            const reclamoCancelado = await this.reclamosService.cancelacionReclamo(idReclamo, dato);

            if (reclamoCancelado.estado){
                res.status(200).send({estado:"OK", mensaje: "Su reclamo ha sido cancelado con éxito.", constancia: reclamoCancelado.mensaje});
            }else{
                res.status(404).send({estado:"Falla", mensaje: reclamoCancelado.mensaje});
            }
        }catch (error){
            res.status(500).send({
                estado:"Falla", mensaje: "Error interno en servidor."
            });
        }
    }

    atencionReclamo = async (req, res) => {
        try{
            const idReclamo = req.params.idReclamo;
            const idReclamoEstado = req.body.idReclamoEstado

            const dato = {
                idReclamoEstado
            };

            const reclamoAtendido = await this.reclamosService.atencionReclamo(idReclamo, dato);

            if (reclamoAtendido.estado){
                res.status(200).send({estado:"OK", mensaje: "Reclamo atendido.", constancia: reclamoAtendido.mensaje});
            }else{
                res.status(404).send({estado:"Falla", mensaje: reclamoAtendido.mensaje});
            }
        }catch (error){
            res.status(500).send({
                estado:"Falla", mensaje: "Error interno en servidor."
            });
        }
    }

    finalizacionReclamo = async (req, res) => {
        try{
            const idReclamo = req.params.idReclamo;
            const idReclamoEstado = req.body.idReclamoEstado

            const dato = {
                idReclamoEstado,
                fechaFinalizado: new Date().toISOString().slice(0, 19).replace('T', ' ')
            };

            const reclamoFinalizado = await this.reclamosService.finalizacionReclamo(idReclamo, dato);

            if (reclamoFinalizado.estado){
                res.status(200).send({estado:"OK", mensaje: "Reclamo finalizado.", constancia: reclamoFinalizado.mensaje});
            }else{
                res.status(404).send({estado:"Falla", mensaje: reclamoFinalizado.mensaje});
            }
        }catch (error){
            res.status(500).send({
                estado:"Falla", mensaje: "Error interno en servidor."
            });
        }
    }

    informe = async (req, res) => {

        try{
            const formato = req.query.formato;
            if(!formato || !formatosPermitidos.includes(formato)){
                return res.status(400).send({
                    estado:"Falla",
                    mensaje: "Formato inválido para el informe."    
                })
            }
            
            // Generar informe
            const {buffer, path, headers} = await this.reclamosService.generarInforme(formato);

            // Setear la cabecera de respuesta 
            res.set(headers)

            if (formato === 'pdf') {
                // Respuesta al cliente  
                res.status(200).end(buffer);
            } else if (formato === 'csv') {
                // Respuesta al cliente
                res.status(200).download(path, (err) => {
                    if (err) {
                        return res.status(500).send({
                            estado:"Falla",
                            mensaje: " No se pudo generar el informe."    
                        })
                    }
                })
            }
        }catch(error){
            console.log(error)
            res.status(500).send({
                estado:"Falla", mensaje: "Error interno en servidor."
            });
        } 

        
    }
   
}
