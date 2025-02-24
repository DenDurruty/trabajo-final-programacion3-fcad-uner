import { conn } from "./conn.js";


export default class Oficinas{

    buscarTodos = async () => {
        
        const sql = 'SELECT * FROM oficinas WHERE activo = 1; ';
        const [result] = await conn.query(sql);
        return result 
    }

    buscarPorId = async (idOficina) => {

        const sql = 'SELECT * FROM oficinas WHERE activo = 1 AND idOficina = ?';
        const [result] = await conn.query(sql, [idOficina]);
        

        return (result.length > 0) ? result[0] : null;
    }

    crear = async ({ nombre, idReclamoTipo=null }) => {

        const sql = 'INSERT INTO oficinas (nombre, idReclamoTipo, activo) VALUES (?,?,?) ';
        const [result] = await conn.query(sql, [nombre, idReclamoTipo, 1]);

        if (result.affectedRows === 0) {
            return null;
        }

        return this.buscarPorId(result.insertId); 
   
    }

    modificar = async ({ idOficina, nombre, idReclamoTipo }) => {
        let campos = [];
        let valores = [];
    
        if (nombre !== undefined) {
            campos.push("nombre = ?");
            valores.push(nombre);
        }
        
        if (idReclamoTipo !== undefined) {
            campos.push("idReclamoTipo = ?");
            valores.push(idReclamoTipo);
        }
    
        if (campos.length === 0) {
            return { estado: false, mensaje: "No se enviaron datos válidos para modificar." };
        }
    
        valores.push(idOficina);
        const sql = `UPDATE oficinas SET ${campos.join(", ")} WHERE idOficina = ?`;
        const [result] = await conn.query(sql, valores);
    
        if (result.affectedRows === 0) {
            return { estado: false, mensaje: "No se pudo modificar la oficina o no se encontraron cambios." };
        }
    
        return this.buscarPorId(idOficina);
    };   

    eliminar = async (idOficina) => {
        const sql = 'DELETE FROM oficinas WHERE idOficina = ?';
        const [result] = await conn.query(sql, [idOficina]);
        if (result.affectedRows === 0) {
            return {
                status: 404,
                json: { mensaje: "No se pudo eliminar la oficina, puede ser que la oficina ya no exista." }
            };
        }
        return { 
            status: 200, 
            json: { mensaje: "Oficina eliminada correctamente." } 
        };
    }

    buscarOficinaPorIdUsuario = async (idUsuario) => {
        const sql = `SELECT idOficina FROM usuarios_oficinas WHERE idUsuario = ?;`;
        const [rows] = await conn.query(sql, [idUsuario]);
        return rows.length ? rows[0].idOficina : null;
    }

    actualizarOficinaUsuario = async (idUsuario, idOficina) => {
        const sql = `UPDATE usuarios_oficinas SET idOficina = ? WHERE idUsuario = ?;`;
        const [result] = await conn.query(sql, [idOficina, idUsuario]);
        return result.affectedRows > 0;
    }

    insertarOficinaUsuario = async (idUsuario, idOficina) => {
        const sql = `INSERT INTO usuarios_oficinas (idUsuario, idOficina, activo) VALUES (?, ?, 1);`;
        const [result] = await conn.query(sql, [idUsuario, idOficina]);
        return result.affectedRows > 0;
    }

    eliminarOficinaUsuario = async (idUsuario) => {
        const sql = `DELETE FROM usuarios_oficinas WHERE idUsuario = ?;`;
        const [result] = await conn.query(sql, [idUsuario]);
        return result.affectedRows > 0;
    }

    agregarEmpleados = async ({idOficina, empleados}) => {
        let agregados = 0;
        
        try{
            // iniciar transacción
            await conn.beginTransaction();

            // por cada empleado hacer insert, aumentar agregados
            for (const empleado of empleados){
                const sql = `INSERT INTO usuarios_oficinas (idUsuario, idOficina, activo) VALUES (?,?, 1);`;
                const [result] = await conn.query(sql, [empleado.idUsuario, idOficina]);
                agregados += 1;
            }

            // confirmar transacción
            await conn.commit();

            // return respuesta
            return {estado: true, mensaje: `se agregaron ${agregados} empleados `};

        }catch (error){
            // revierto la transacción en caso de error.
            await conn.rollback();
            console.log(error)
            return { estado: false, mensaje: 'Error al agregar empleados a la oficina.' };
        }
    }


}