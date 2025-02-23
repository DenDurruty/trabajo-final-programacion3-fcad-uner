// Middleware de autorización
function autorizarUsuarios(perfilesAutorizados = []) {

    return (req, res, next) => {
        
        const usuario = req.user;

        if (!usuario || !perfilesAutorizados.includes(usuario.idUsuarioTipo)) {
            return res.status(403).json({
                estado: "Falla",
                mensaje: "Acceso denegado."
            });
        }

        next(); 
        console.log("Middleware autorizarUsuarios - req.user:", req.user);


    };
    
}


export default autorizarUsuarios;