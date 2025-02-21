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
    
    buscarPorCliente = (idUsuario) => {
        return this.reclamos.buscarPorCliente(idUsuario);
    }
    
    crear = async (reclamo) => {
        // Verificar creación del reclamo
        const reclamoCreado = await this.reclamos.crear(reclamo);
        if (!reclamoCreado) {
            return {estado: false, mensaje: "Reclamo no creado"};
        }
        return {estado: true, mensaje: "Su reclamo ha sido creado con éxito", data: reclamoCreado};
    }

    modificar = async (idReclamo, datos) => {
        const existe = await this.reclamos.buscarPorId(idReclamo);
        if (existe === null) {
            return {estado: false, mensaje: "idReclamo no existe"};
        }

        await this.reclamos.modificar(idReclamo, datos);
        return {estado: true, mensaje:"Reclamo modificado"};
    }

    cancelacionReclamo = async (idReclamo, datosReclamo) => {
        // Verificar existencia del reclamo y modificar
        const existe = await this.reclamos.sePuedeCancelar(idReclamo);
        if (existe === null) {
            return {estado: false, mensaje: 'idReclamo no existe / Ya no se puede cancelar.'};
        }    

        const modificado = await this.reclamos.modificar(idReclamo, datosReclamo);
        if (!modificado){
            return {estado: false, mensaje: 'Reclamo no cancelado'};
        }

        // Buscar datos del cliente
        const cliente = await this.reclamos.buscarInformacionClientePorReclamo(idReclamo);
        if (!cliente){
            return {estado: false, mensaje: 'Faltan datos de cliente'};
        }

        const datosCorreo = {
            nombre: cliente[0].cliente,
            correoElectronico: cliente[0].correoElectronico,
            reclamo: idReclamo,
            estado: cliente[0].estado,
        }
        // Enviar notificacion
        return await this.notificaciones.enviarCorreo(datosCorreo);        
    }

    atencionReclamo = async (idReclamo, datosReclamo) => {
        // Verificar existencia reclamo
        const existe = await this.reclamos.buscarPorId(idReclamo);
        if (existe === null) {
            return {estado: false, mensaje: 'idReclamo no existe'};
        }    

        // Modificar reclamo
        const modificado = await this.reclamos.modificar(idReclamo, datosReclamo);
        if (!modificado){
            return {estado: false, mensaje: 'Reclamo no modificado'};
        }

        // Buscar datos del cliente
        const cliente = await this.reclamos.buscarInformacionClientePorReclamo(idReclamo);
        if (!cliente || cliente.length === 0) {
            console.log("faltan datos");
            return {estado: false, mensaje: 'Faltan datos de cliente'};
        }
         
        const datosCorreo = {
            nombre: cliente[0].cliente,
            correoElectronico: cliente[0].correoElectronico,
            reclamo: idReclamo,
            estado: cliente[0].estado,
        }
        
        // Enviar notificacion
        return await this.notificaciones.enviarCorreo(datosCorreo);
        
    }

    finalizacionReclamo = async (idReclamo, datosReclamo) => {
        // Verificar existencia del reclamo
        const existe = await this.reclamos.buscarPorId(idReclamo);
        if (existe === null) {
            return {estado: false, mensaje: 'idReclamo no existe'};
        }    

        // Modificar reclamo
        const modificado = await this.reclamos.modificar(idReclamo, datosReclamo);
        if (!modificado){
            return {estado: false, mensaje: 'Reclamo no modificado'};
        }

        // Buscar datos del cliente
        const cliente = await this.reclamos.buscarInformacionClientePorReclamo(idReclamo);
        if (!cliente || cliente.length === 0) {
            console.log("faltan datos");
            return {estado: false, mensaje: 'Faltan datos de cliente'};
        }
         
        const datosCorreo = {
            nombre: cliente[0].cliente,
            correoElectronico: cliente[0].correoElectronico,
            reclamo: idReclamo,
            estado: cliente[0].estado,
        }
        
        // Enviar notificacion
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
