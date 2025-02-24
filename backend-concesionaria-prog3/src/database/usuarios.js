import { conn } from "./conn.js";

export default class Usuarios{

    buscarTodos = async () => {
        
        const sql = 'SELECT * FROM usuarios WHERE activo = 1; ';
        const [result] = await conn.query(sql);
        return result 
    }

    buscarPorId = async (idUsuario) => {
        const sql = `SELECT CONCAT(u.nombre, ' ', u.apellido) as usuario, u.idUsuarioTipo, u.idUsuario
            FROM usuarios  AS u
            WHERE u.idUsuario = ?
                AND u.activo = 1;`
        const [result] = await conn.query(sql, [idUsuario]);

        return (result.length > 0) ? result[0] : null;
    }

    buscar = async (correoElectronico) => {
        const sql = `SELECT u.idUsuario, CONCAT(u.nombre, ' ', u.apellido) as usuario, u.idUsuarioTipo, u.contrasenia
            FROM usuarios AS u
            WHERE u.correoElectronico = ? 
                AND u.activo = 1;`;
        const [result] = await conn.query(sql, [correoElectronico]);
        return result[0];
    };
  
    buscarPorEmail = async (correoElectronico) => {
        const sql = 'SELECT * FROM usuarios WHERE correoElectronico = ?;'
        const [result] = await conn.query(sql, [correoElectronico]);

        return (result.length > 0) ? result[0] : null;
    };

    crearUsuarioAdm = async ({ nombre, apellido, correoElectronico, contrasenia, idUsuarioTipo, imagen = null }) => {
        const sql = `INSERT INTO usuarios (nombre, apellido, correoElectronico, contrasenia, idUsuarioTipo, imagen, activo)
                    VALUES (?, ?, ?, ?, ?, ?, ?)`;
    
        const [result] = await conn.query(sql, [nombre, apellido, correoElectronico, contrasenia, 1, imagen, 1]);
    
        if (result.affectedRows === 0) {
            return null;
        }
        
        return { id: result.insertId, nombre, apellido, correoElectronico, contrasenia, idUsuarioTipo: 1, imagen, activo: 1 };
    };

    crearUsuarioClt = async ({ nombre, apellido, correoElectronico, contrasenia, idUsuarioTipo, imagen = null }) => {
        const sql = `INSERT INTO usuarios (nombre, apellido, correoElectronico, contrasenia, idUsuarioTipo, imagen, activo)
                    VALUES (?, ?, ?, ?, ?, ?, ?)`;
    
        const [result] = await conn.query(sql, [nombre, apellido, correoElectronico, contrasenia, 3, imagen, 1]);
    
        if (result.affectedRows === 0) {
            return null;
        }
        
        return { id: result.insertId, nombre, apellido, correoElectronico, contrasenia, idUsuarioTipo: 3, imagen, activo: 1 };
    };

    crearUsuarioEe = async ({ nombre, apellido, correoElectronico, contrasenia, idUsuarioTipo, imagen = null, idOficina = null }) => {

        // Obtener conexión pool
        const pool = await conn.getConnection();

        try {
            // Iniciar la transacción
            await pool.beginTransaction(); 
        
            // Insertar en la tabla usuarios
            const sql1 = `INSERT INTO usuarios (nombre, apellido, correoElectronico, contrasenia, idUsuarioTipo, imagen, activo)
                          VALUES (?, ?, ?, ?, ?, ?, ?)`;
            const [resultUsuario] = await pool.query(sql1, [nombre, apellido, correoElectronico, contrasenia, 2, imagen, 1]);

            const idUsuario = resultUsuario.insertId;

            // Si el usuario tiene una oficina asociada, insertar en usuarios_oficinas
            if (idOficina) {
                const sql2 = `INSERT INTO usuarios_oficinas (idOficina, idUsuario) 
                              VALUES (?, ?)`;
                await pool.query(sql2, [idOficina, idUsuario]);
            }

            // Confirmar la transacción
            await pool.commit();
    
            // Retornar los datos del usuario creado
            return { idUsuario, nombre, apellido, correoElectronico, idUsuarioTipo: 2, imagen, idOficina, activo: 1 };

        } catch (error) {
            // Revertir la transacción en caso de error
            await pool.rollback(); 
            console.error('Error al crear usuario:', error);
            return null;
        } finally {
            // Liberrar la conexión pool
            pool.release(); 
        }
    };

    registrar = async ({ nombre, apellido, correoElectronico, contrasenia, idUsuarioTipo, imagen = null }) => {
        const sql = `INSERT INTO usuarios (nombre, apellido, correoElectronico, contrasenia, idUsuarioTipo, imagen, activo)
                    VALUES (?, ?, ?, ?, ?, ?, ?)`;
    
        const [result] = await conn.query(sql, [nombre, apellido, correoElectronico, contrasenia, idUsuarioTipo, imagen, 1]);
    
        if (result.affectedRows === 0) {
            return null;
        }
    
        return { id: result.insertId, nombre, apellido, correoElectronico, contrasenia, idUsuarioTipo, imagen, activo: 1 };
    };

    modificar = async (idUsuario, datos) => {
        const sql = `UPDATE usuarios SET ? WHERE idUsuario = ?;`;
        const [result] = await conn.query(sql, [datos, idUsuario]);
        
        if (result.affectedRows === 0) {
            return false;
        }
        
        return true;
    };

    modificarUsuarioEe = async (idUsuario, datos, idOficina) => {
        const pool = await conn.getConnection();
    
        try {
            await pool.beginTransaction();
    
            // Obtener los datos actuales del usuario
            const [usuarioActual] = await pool.query(`SELECT idUsuarioTipo FROM usuarios WHERE idUsuario = ?`, [idUsuario]);
    
            if (!usuarioActual.length) {
                await pool.rollback();
                return null; // Usuario no existe
            }
    
            // Si no se envió idUsuarioTipo, se mantiene el actual
            const idUsuarioTipo = datos.idUsuarioTipo !== undefined ? datos.idUsuarioTipo : usuarioActual[0].idUsuarioTipo;
    
            // Actualizar usuario en `usuarios`
            const sql1 = `UPDATE usuarios SET idUsuarioTipo = ? WHERE idUsuario = ?`;
            await pool.query(sql1, [idUsuarioTipo, idUsuario]);
    
            // Manejo de oficina
            const [oficinaActual] = await pool.query(`SELECT idOficina FROM usuarios_oficinas WHERE idUsuario = ?`, [idUsuario]);
    
            if (idOficina !== undefined) {
                if (oficinaActual.length) {
                    // Si ya tiene oficina, actualizarla
                    const sql2 = `UPDATE usuarios_oficinas SET idOficina = ? WHERE idUsuario = ?`;
                    await pool.query(sql2, [idOficina, idUsuario]);
                } else {
                    // Si no tenía oficina, insertarla
                    const sql3 = `INSERT INTO usuarios_oficinas (idUsuario, idOficina) VALUES (?, ?)`;
                    await pool.query(sql3, [idUsuario, idOficina]);
                }
            }
    
            await pool.commit();
            return { idUsuario, idUsuarioTipo, idOficina };
    
        } catch (error) {
            await pool.rollback();
            console.error('Error al modificar el usuario:', error);
            return null;
        } finally {
            pool.release();
        }
    };

    eliminarUsuarioEe = async (idUsuario) => {
        const pool = await conn.getConnection();
    
        try {
            await pool.beginTransaction();
    
            // Verificar si el usuario existe
            const [usuarioExiste] = await pool.query(`SELECT * FROM usuarios WHERE idUsuario = ?`, [idUsuario]);
            if (!usuarioExiste.length) {
                await pool.rollback();
                return null; // Usuario no encontrado
            }
    
            // Eliminar relación con oficina (si existe)
            await pool.query(`DELETE FROM usuarios_oficinas WHERE idUsuario = ?`, [idUsuario]);
    
            // Eliminar usuario de la tabla `usuarios`
            await pool.query(`DELETE FROM usuarios WHERE idUsuario = ?`, [idUsuario]);
    
            await pool.commit();
            return true;
    
        } catch (error) {
            await pool.rollback();
            console.error('Error al eliminar el usuario:', error);
            return null;
        } finally {
            pool.release();
        }
    };
    
    verPerfil = async (idUsuario) => {
        const sql = `SELECT nombre, apellido, correoElectronico, imagen FROM usuarios WHERE idUsuario = ? `;
        const [result] = await conn.query(sql, [idUsuario]);

        return (result.length > 0) ? result[0] : null;
    }

    actualizarPerfil = async (idUsuario, datos) => {
        const sql = `UPDATE usuarios SET ? WHERE idUsuario = ?;`;
        const [result] = await conn.query(sql, [datos, idUsuario]);
        
        if (result.affectedRows === 0) {
            return false;
        }
        
        return true;
    };

}; 