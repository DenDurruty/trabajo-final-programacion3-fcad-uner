import OficinasService from "../services/oficinasService.js";

export default class OficinasController{

    constructor(){
        this.service = new OficinasService
    }

    agregarEmpleados = async (req, res) => {
        const { idUsuario, idOficina } = req.body;
        const empleados = [ { idUsuario: idUsuario } ];

        if (!idOficina) {
            return res.status(400).send({
                estado:"Falla",
                mensaje: "Faltan datos para crear la relación."    
            })
        }

        if (empleados.length === 0) {
            return res.status(400).send({
                estado:"Falla",
                mensaje: "Faltan datos para crear la relación."    
            }),
            console.log('no se encontraron empleados')
        };

        try{
            const oficinaEmpleados = {
                idOficina, 
                empleados
            }

            const nuevoOficinaEmpleados = await this.service.agregarEmpleados(oficinaEmpleados);
            
            if (nuevoOficinaEmpleados.estado){
                res.status(200).send({estado:"OK", mensaje: nuevoOficinaEmpleados.mensaje});
            }else{
                res.status(404).send({estado:"Falla", mensaje: nuevoOficinaEmpleados.mensaje});
            }
        }catch (error){
            console.log(error);
            res.status(500).send({
                estado:"Falla", mensaje: "Error interno en servidor."
            });
        }
    }

}