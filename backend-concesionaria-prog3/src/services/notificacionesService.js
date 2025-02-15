import nodemailer from 'nodemailer';
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
