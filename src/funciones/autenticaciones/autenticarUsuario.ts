import respuesta from "../res";

function autenticarUsuario(req: any, res: any, next: any) {
    const rol =  req.user.rol;
  if (rol ===  "USUARIO") {
      return respuesta(res, 401, { error: "usuario no autorizado" });
  }
  next()
}

export default autenticarUsuario