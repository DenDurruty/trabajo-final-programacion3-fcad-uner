import { conn } from './conn.js';

export default class ReclamosTipo {

    buscarTodos = async () => {
        
        const sql = 'SELECT * FROM reclamos_tipo WHERE activo = 1; ';
        const [result] = await conn.query(sql);
        return result 
    }

    buscarPorId = async (idReclamoTipo) => {

        const sql = 'SELECT * FROM reclamos_tipo WHERE activo = 1 AND idReclamoTipo = ?';
        const [result] = await conn.query(sql, [idReclamoTipo]);
        

        return (result.length > 0) ? result[0] : null;
    }

    crear = async ({ descripcion, activo }) => {

        const sql = 'INSERT INTO reclamos_tipo (descripcion, activo) VALUES (?,?) ';
        const [result] = await conn.query(sql, [descripcion, activo]);

        if (result.affectedRows === 0) {
            return result.status(404).json({ 
                mensaje: "No se puedo crear el nuevo tipo de reclamo."
            })
        }

        return this.buscarPorId(result.insertId)
    }

    modificar = async ({ idReclamoTipo, descripcion, activo }) => {

        const sql = 'UPDATE reclamos_tipo SET descripcion = ? , activo = ? WHERE idReclamoTipo = ?';
        const [result] = await conn.query(sql, [descripcion, activo, idReclamoTipo]);

        if (result.affectedRows === 0) {
            return result.status(404).json({ 
                mensaje: "No se puedo modificar el tipo de reclamo."
            });
        }

        return this.buscarPorId(idReclamoTipo);

    }

    eliminar = async (idReclamoTipo) => {
        const sql = 'DELETE FROM reclamos_tipo WHERE idReclamoTipo = ?';
        const [result] = await conn.query(sql, [idReclamoTipo]);
        if (result.affectedRows === 0) {
            return {
                status: 404,
                json: { mensaje: "No se pudo eliminar el tipo de reclamo, puede ser que el tipo de reclamo ya no exista." }
            };
        }
        return { 
            status: 200, 
            json: { mensaje: "Tipo de reclamo eliminado correctamente." } 
        };
    }
}

