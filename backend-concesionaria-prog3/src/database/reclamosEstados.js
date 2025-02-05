import { conn } from './conn.js';

// Crear clase para contener el método GET
export default class ReclamosEstados {

    buscarTodos = async () => {
        
        const sql = 'SELECT * FROM reclamosEstado WHERE activo = 1; ';
        const [result] = await conn.query(sql);
        return result 
    }
}

