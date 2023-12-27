import express from "express";
const router = express.Router();
import { resgistrar, autenticar, confirmar,
    olvidePassword, comprobarToken, nuevoPassword } from "../controllers/usuarioController.js";

//Autenticação, Registo e Confirmação de Users
router.post("/", resgistrar); //Cria um novo user
router.post('/login', autenticar);
router.get('/confirmar/:token', confirmar);
router.post('/olvide-password', olvidePassword);
router.get('/olvide-password/:token', comprobarToken);
router.post('/olvide-password/:token', nuevoPassword);


export default router;