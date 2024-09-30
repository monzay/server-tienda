import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import autenticarToken from "../funciones/autenticaciones/autenticarToken";
import autenticarUsuario from "../funciones/autenticaciones/autenticarUsuario";

const prisma= new PrismaClient()

const router = Router()

router.put('/producto/:id',autenticarToken,autenticarUsuario, async (req :any, res :any) => {
    try {
        const { id } = req.params;
        const { nombre, descripcion, precio, img_url, categoriaId } = req.body;
      prisma.productos.update({
        where: {id : Number(id) },
    
        data: {
            nombre,
            descripcion,
            precio,
            img_url,
            categoriaId
        }
      }
      )
        
    } catch (error:any) {
    }
});

export default router