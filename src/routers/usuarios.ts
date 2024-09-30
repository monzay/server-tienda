import { Router } from "express";

const router = Router()
router.get('/', async (req, res) => {
    res.send("HOLA COMO ESTAS")
});

export default router 