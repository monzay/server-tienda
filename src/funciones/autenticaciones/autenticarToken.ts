import respuesta from "../res";
import { JWT_SECRET } from "../../configuracion";
import jwt from "jsonwebtoken";

function autenticarToken(req: any, res: any, next: any) {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) return respuesta(res, 401, { error: "Token no proporcionado" });
    
    jwt.verify(token, JWT_SECRET, (err: any, user: any) => {
        if (err) return respuesta(res, 403, { error: "Token inválido" });
        req.user = user; // Guardar información del usuario en la solicitud
        next(); // Pasar al siguiente middleware o ruta
    });
}

export default autenticarToken