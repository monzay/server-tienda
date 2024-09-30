import { Router } from "express";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";
import respuesta from "../funciones/res";
import { PrismaClient } from "@prisma/client";
import { JWT_SECRET } from "../configuracion";

const router = Router()
const prisma = new PrismaClient();

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const usuario = await prisma.usuario.findUnique({
            where: { email }
        });
        if (usuario && await bcrypt.compare(password, usuario.password)) {
            const token = jwt.sign({ userId: usuario.id }, JWT_SECRET, { expiresIn: '1d' });
            respuesta(res, 200, { mensaje: "Inicio de sesión exitoso", token });
        } else {
            respuesta(res, 401, { error: "Credenciales inválidas" });
        }
    } catch (error) {
        respuesta(res, 400, { error: "Error al iniciar sesión" });
    }
});

export default router 