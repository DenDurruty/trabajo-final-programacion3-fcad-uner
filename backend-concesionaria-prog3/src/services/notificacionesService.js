/*import nodemailer from 'nodemailer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import handlebars from 'handlebars';

export default class NotificacionesService {
    enviarCorreo = async (datosCorreo) => {        
        const __filename = fileURLToPath(import.meta.url);
        const __dirname = path.dirname(__filename);
        const plantillaPath = path.join(__dirname, '../utiles/handlebars/plantilla.hbs');
        const plantilla = fs.readFileSync(plantillaPath, 'utf-8');

        const template = handlebars.compile(plantilla);
        const datos = {
            nombre: datosCorreo.cliente,  
            reclamo: datosCorreo.reclamo

        };
        const correoHtml = template(datos);
        
        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
                user: process.env.CORREO,
                pass: process.env.CLAVE
            },
            tls: {
                rejectUnauthorized: false // Esto ignora los certificados autofirmados si es necesario
              }
        });
        
        const mailOptions = {
            to: datosCorreo.correoElectronico,
            subject: "NOTIFICACION PROG3",
            html: correoHtml
        };

        try {
            const info = await transporter.sendMail(mailOptions);
            return { estado: true, mensaje: 'Correo electrónico enviado.' };
        } catch (error) {
            return { estado: false, mensaje: 'Correo electrónico no enviado.' };
        }
    }
}
    */
import nodemailer from 'nodemailer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import handlebars from 'handlebars';

export default class NotificacionesService {
    enviarCorreo = async (datosCorreo) => {
        const __filename = fileURLToPath(import.meta.url);
        const __dirname = path.dirname(__filename);

        // Determinar qué plantilla usar según el estado
        let plantillaPath;
        switch (datosCorreo.estado.toLowerCase()) {
            case 'cancelado':
                plantillaPath = path.join(__dirname, '../utiles/handlebars/cancelado.hbs');
                break;
            case 'atendido':
                plantillaPath = path.join(__dirname, '../utiles/handlebars/atendido.hbs');
                break;
            case 'finalizado':
                plantillaPath = path.join(__dirname, '../utiles/handlebars/finalizado.hbs');
                break;
            default:
                throw new Error('Estado desconocido: No se encontró una plantilla para el estado proporcionado.');
        }

        // Leer y compilar la plantilla seleccionada
        const plantilla = fs.readFileSync(plantillaPath, 'utf-8');
        const template = handlebars.compile(plantilla);

        const datos = {
            nombre: datosCorreo.nombre, // Nombre del cliente
            reclamo: datosCorreo.reclamo, // Número de reclamo
        };

        const correoHtml = template(datos);

        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
                user: process.env.CORREO,
                pass: process.env.CLAVE
            },
            tls: {
                rejectUnauthorized: false
            }
        });

        const mailOptions = {
            to: datosCorreo.correoElectronico,
            subject: "NOTIFICACION PROG3",
            html: correoHtml
        };

        try {
            const info = await transporter.sendMail(mailOptions);
            return { estado: true, mensaje: 'Correo electrónico enviado.' };
        } catch (error) {
            return { estado: false, mensaje: 'Correo electrónico no enviado.' };
        }
    }
}
