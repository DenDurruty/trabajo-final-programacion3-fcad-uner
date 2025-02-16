import Reclamos from "../database/reclamos.js";
import NotificacionesService from "./notificacionesService.js";
import InformeService from "./informeService.js";


export default class ReclamosService {

    constructor(){
        this.reclamos = new Reclamos();
        this.notificaciones = new NotificacionesService();
        this.informes = new InformeService();
    }

    buscarTodos = () => {
        return this.reclamos.buscarTodos();
    }

    buscarPorId = (idReclamo) => {
        return this.reclamos.buscarPorId(idReclamo);
    }
    
    crear = async (reclamo) => {
        const reclamoCreado = await this.reclamos.crear(reclamo);
        if (!reclamoCreado) {
            return {estado: false, mensaje: "Reclamo no creado"};
        }
        return {estado: true, mensaje: "Reclamo creado", data: reclamoCreado};
    }

    modificar = async (idReclamo, datos) => {
        const existe = await this.reclamos.buscarPorId(idReclamo);
        if (existe === null) {
            return {estado: false, mensaje: "idReclamo no existe"};
        }

        await this.reclamos.modificar(idReclamo, datos);
        return {estado: true, mensaje:"Reclamo modificado"};
    }

    atencionReclamo = async (idReclamo, datosReclamo) => {
        // verificar si existe el reclamo
        const existe = await this.reclamos.buscarPorId(idReclamo);
        if (existe === null) {
            return {estado: false, mensaje: 'idReclamo no existe'};
        }    

        // modificar el reclamo
        const modificado = await this.reclamos.modificar(idReclamo, datosReclamo);
        if (!modificado){
            return {estado: false, mensaje: 'Reclamo no modificado'};
        }

        // buscar los datos del cliente
        const cliente = await this.reclamos.buscarInformacionClientePorReclamo(idReclamo);
        if (!cliente || cliente.length === 0) {
            console.log("faltan datos");
            return {estado: false, mensaje: 'Faltan datos de cliente'};
        }
        /*
        if (resultado.length > 0) {
            const datosCorreo = {
                cliente: resultado[0].cliente,
                correoElectronico: resultado[0].correoElectronico,
                reclamo: idReclamo // Asigna manualmente el ID del reclamo
            };
        }
        */
       /* if (!cliente){
            return {estado: false, mensaje: 'Faltan datos de cliente'};
        }*/

         
        const datosCorreo = {
            nombre: cliente[0].nombre,
            correoElectronico: cliente[0].correoElectronico,
            reclamo: idReclamo
        }
        
        // enviar la notificacion
        return await this.notificaciones.enviarCorreo(datosCorreo);
        
    }

    generarInforme = async (formato) => {
        if (formato === 'pdf') {

            return await this.reportePdf();

        }else if (formato === 'csv'){
            
            return await this.reporteCsv();

        }
    }

    reportePdf = async () => {
        const datosReporte = await this.reclamos.buscarDatosReportePdf();

        if (!datosReporte || datosReporte.length === 0) {
            return { estado: false, mensaje: 'Sin datos para el reporte'};
        }

        const pdf = await this.informes.informeReclamosPdf(datosReporte);
        
        return {
            buffer: pdf,
            headers: {
                'Content-Type': 'application/pdf',
                'Content-Disposition': 'inline; filename="reporte.pdf"'
            }
        };
    }

    reporteCsv = async () => {
        const datosReporte = await this.reclamos.buscarDatosReporteCsv();

        if (!datosReporte || datosReporte.length === 0) {
            return {estado: false, mensaje: 'Sin datos para el reporte'};
        }

        const csv =  await this.informes.informeReclamosCsv(datosReporte);
        return {
            path: csv,
            headers: {
                'Content-Type': 'text/csv',
                'Content-Disposition': 'attachment; filename="reporte.csv"'
            }
        };
    }

}
