import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config(); 

// Conexión a la base de datos
export const conn = mysql.createPool({
    host: process.env.HOST_DATABASE,
    user: process.env.USER_DATABASE,
    password: process.env.PASS_DATABASE,
    database: process.env.NAME_DATABASE,
    waitForConnections: true,
    connectionLimit: 10, 
});