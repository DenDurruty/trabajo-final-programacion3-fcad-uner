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

    crearUsuario = async ({ nombre, apellido, correoElectronico, contrasenia, idUsuarioTipo, imagen = null }) => {
        const sql = `INSERT INTO usuarios (nombre, apellido, correoElectronico, contrasenia, idUsuarioTipo, imagen, activo)
                    VALUES (?, ?, ?, ?, ?, ?, ?)`;
    
        const [result] = await conn.query(sql, [nombre, apellido, correoElectronico, contrasenia, idUsuarioTipo, imagen, 1]);
    
        if (result.affectedRows === 0) {
            return null;
        }
        
        return { id: result.insertId, nombre, apellido, correoElectronico, contrasenia, idUsuarioTipo, imagen, activo: 1 };
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
    }
    
}