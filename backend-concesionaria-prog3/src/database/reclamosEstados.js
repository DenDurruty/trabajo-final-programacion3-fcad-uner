import { conn } from './conn.js';

// Crear clase para contener el método GET
export default class ReclamosEstados {

    buscarTodos = async () => {
        
        const sql = 'SELECT * FROM reclamosEstado WHERE activo = 1; ';
        const [result] = await conn.query(sql);
        return result 
    }

    buscarPorId = async (idReclamoEstado) => {

        const sql = 'SELECT * FROM reclamosEstado WHERE activo = 1 AND idReclamoEstado =?';
        const [result] = await conn.query(sql, [idReclamoEstado]);

        return (result.length > 0) ? result[0] : null;
    }

    crear = async ({descripcion, activo}) => {

        const sql = 'INSERT INTO reclamosEstado (descripcion, activo) VALUES (?,?) ';
        const [result] = await conn.query(sql, [descripcion, activo]);

        if (result.affectedRows === 0) {
            return result.status(404).json({ 
                mensaje: "No se puedo crear el Reclamo-estado."
            })
        }

        return this.buscarPorId(result.insertId)
    }
}

// modificar = async () => {
//    }