function respuesta(res: any, status: any, data: any) {
    return res.status(status).json(data)
}

export default respuesta