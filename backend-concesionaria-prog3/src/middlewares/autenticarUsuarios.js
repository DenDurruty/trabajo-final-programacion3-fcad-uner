import jwt from 'jsonwebtoken';

// Middleware de autenticación
function autenticarUsuario(req, res, next) {

    const token = req.headers['authorization']?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ mensaje: 'Token no proporcionado.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        console.log("Decoded JWT:", decoded);
        next();
    } catch (error) {
        return res.status(401).json({ mensaje: 'Token no válido.' });
    }
}

export default autenticarUsuario;