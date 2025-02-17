import multer from 'multer';

// configuración de almacenamiento para multer
const storage = multer.diskStorage({ 
    destination: function (req, file, cb) {       
        cb(null, 'publico'); // ruta donde se guardaran las imagenes
    },
    filename: function (req, file, cb)  {
        cb(null, file.originalname ); // guarda el archivo con el mismo nombre que tenía en la carpeta local
    }
    
})

export {storage}