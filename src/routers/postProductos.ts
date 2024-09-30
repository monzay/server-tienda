import { Router } from "express";
import respuesta from "../funciones/res";
import { PrismaClient } from "@prisma/client";
import autenticarToken from "../funciones/autenticaciones/autenticarToken";
import autenticarUsuario from "../funciones/autenticaciones/autenticarUsuario";
import { body, validationResult } from "express-validator";
import xss from "xss";

const router = Router();
const prisma = new PrismaClient();

router.post(
  '/producto',
  autenticarToken,
  autenticarUsuario,
  [
    body('nombre').trim().escape().notEmpty().isLength({ max: 100 }),
    body('descripcion').trim().escape().notEmpty().isLength({ max: 500 }),
    body('precio').isNumeric(),
    body('img_url').trim().isURL(),
    body('categoriaId').isInt(),
  ],
  async (req, res) => {
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
      return respuesta(res, 400, { errores: errores.array() });
    }

    const { nombre, descripcion, precio, img_url, categoriaId } = req.body;

    try {
      const nuevoProducto = await prisma.productos.create({
        data: {
          nombre: xss(nombre),
          descripcion: xss(descripcion),
          precio: Number(precio),
          img_url: xss(img_url),
          categoriaId: Number(categoriaId),
          usuario: { connect: { id: req.user.id } },
        },
      });

      respuesta(res, 201, { mensaje: "Producto creado con éxito.", producto: nuevoProducto });
    } catch (error) {
      console.error("Error al crear producto:", error);
      respuesta(res, 500, { error: "Error interno del servidor" });
    }
  }
);

export default router;