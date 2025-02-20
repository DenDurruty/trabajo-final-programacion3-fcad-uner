import { conn } from './conn.js';

export default class Reclamos{

    buscarTodos = async () => {
        const sql = `SELECT r.asunto, r.descripcion, r.fechaCreado, r.fechaFinalizado, r.fechaCancelado, 
                        r.idReclamoEstado, re.descripcion AS "Descripción Estado", 
                        r.idReclamoTipo, rt.descripcion AS "Descripción Tipo", 
                        u.nombre AS "Creado por"
                        FROM reclamos AS r
                        INNER JOIN reclamos_tipo AS rt ON rt.idReclamoTipo = r.idReclamoTipo
                        INNER JOIN reclamos_estado AS re ON re.idReclamoEstado = r.idReclamoEstado
                        INNER JOIN usuarios AS u ON u.idUsuario = r.idUsuarioCreador;`

        const [result] = await conn.query(sql);
        return result;
    }

    buscarPorId = async (idReclamo) => {
        const sql = `SELECT * FROM reclamos WHERE idReclamo = ?`;
        const [result] = await conn.query(sql, [idReclamo]);
        
        return (result.length > 0) ? result[0] : null;
    }
    
    buscarPorCliente = async (idUsuario) => {
        const sql = `SELECT * FROM reclamos WHERE idUsuarioCreador = ?`;
        const [result] = await conn.query(sql, [idUsuario]);
        return (result.length > 0) ? result : [];
    }
    
    crear = async ({asunto, idReclamoTipo, idUsuarioCreador}) => {

        const sql = 'INSERT INTO reclamos (asunto, fechaCreado, idReclamoTipo, idReclamoEstado, idUsuarioCreador) VALUES (?, NOW(), ?, 1, ?)';
        const [result] = await conn.query(sql, [asunto, idReclamoTipo, idUsuarioCreador]);

        if (result.affectedRows === 0) {
            return false;
        }
        
        return this.buscarPorId(result.insertId);
    }

    modificar = async (idReclamo, datos) => {
        const sql = 'UPDATE reclamos SET ? WHERE idReclamo = ?';
        const [result] =await conn.query(sql, [datos, idReclamo]);

        if (result.affectedRows === 0) {
            return false;
        }

        return true;
    }

    sePuedeCancelar = async (idReclamo) => {
        const sql = `SELECT * FROM reclamos WHERE idReclamo = ? AND idReclamoEstado = 1`;
        const [result] = await conn.query(sql, [idReclamo]);
        return (result.length > 0) ? result[0] : null;
    }

    atencionReclamo = async (idReclamo, datos) => {
        const sql = 'UPDATE reclamos SET ? WHERE idReclamo = ?';
        const [result] =await conn.query(sql, [datos, idReclamo]);

        if (result.affectedRows === 0) {
            return false;
        }

        return true;
    }

    buscarInformacionClientePorReclamo = async (idReclamo) => {
        const sql = `SELECT CONCAT(u.apellido, ', ', u.nombre) AS cliente, u.correoElectronico, rt.descripcion AS estado 
                        FROM reclamos AS r 
                        INNER JOIN usuarios AS u ON u.idUsuario = r.idUsuarioCreador 
                        INNER JOIN reclamos_estado AS rt ON rt.idReclamoEstado = r.idReclamoEstado
                        WHERE r.idReclamo = ?;`;
        const [result] = await conn.query(sql, [idReclamo]);

        return result;
    }

    buscarDatosReportePdf = async () => {        
        const sql = 'CALL `datosPDF`()';

        const [result] = await conn.query(sql);

        const datosReporte = {
            reclamosTotales : result[0][0].reclamosTotales,
            reclamosNoFinalizados : result[0][0].reclamosNoFinalizados,
            reclamosFinalizados : result[0][0].reclamosFinalizados,
            descripcionTipoRreclamoFrecuente : result[0][0].descripcionTipoRreclamoFrecuente,
            cantidadTipoRreclamoFrecuente : result[0][0].cantidadTipoRreclamoFrecuente
        }

        return datosReporte;
    }

    buscarDatosReporteCsv = async () => {
        const sql = `SELECT r.idReclamo as 'reclamo', rt.descripcion as 'tipo', re.descripcion AS 'estado',
                     DATE_FORMAT(r.fechaCreado, '%Y-%m-%d %H:%i:%s') AS 'fechaCreado', CONCAT(u.nombre, ' ', u.apellido) AS 'cliente'
                    FROM reclamos AS r 
                    INNER JOIN reclamos_tipo AS rt ON rt.idReclamoTipo = r.idReclamoTipo 
                    INNER JOIN reclamos_estado AS re ON re.idReclamoEstado = r.idReclamoEstado 
                    INNER JOIN usuarios AS u ON u.idUsuario = r.idUsuarioCreador 
                        WHERE r.idReclamoEstado <> 4;`;

        const [result] = await conn.query(sql);
        return result;
    }

    
}
