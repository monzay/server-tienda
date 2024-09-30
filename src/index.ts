import express, { Router } from 'express';
import { PORT } from './configuracion';
import login from "./routers/login"
import signup from "./routers/signup"
import user from "./routers/usuarios"
import putProducto from "./routers/putProducto"
const app = express();
app.use(express.json());

app.use("/api",login)
app.use("/api",signup)
app.use("/api",putProducto)



app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});