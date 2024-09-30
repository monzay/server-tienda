import { Router } from "express";
import respuesta from "../funciones/res";
import { PrismaClient } from "@prisma/client";

const router = Router()
const prisma = new PrismaClient()

router.get('/productos', async (req, res) => {
    const productos = await prisma.productos.findMany();
});


export default router