import { Router } from "express";
import respuesta from "../funciones/res";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
import { JWT_SECRET } from "../configuracion";

const router = Router()
const prisma = new PrismaClient()

router.post('/signup', async (req, res) => {
    try {
        const { nombre, email, password, telefono } = req.body;
        
        const usuarioExistente = await prisma.usuario.findUnique({
            where: { email }
        });

        if (usuarioExistente) {
            return respuesta(res, 400, { error: "El usuario ya existe" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const nuevoUsuario = await prisma.usuario.create({
            data: {
                nombre,
                email,
                password: hashedPassword,
                telefono
            }
        });
        const token = jwt.sign({ userId: nuevoUsuario.id }, JWT_SECRET, { expiresIn: '1h' });
        respuesta(res, 201, { mensaje: "Usuario creado exitosamente", token });
    } catch (error) {
         respuesta(res, 400, { error });
    }
});


export default router