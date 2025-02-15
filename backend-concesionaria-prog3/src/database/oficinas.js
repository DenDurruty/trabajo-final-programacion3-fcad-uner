import { conn } from "./conn.js";


export default class Oficinas{

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