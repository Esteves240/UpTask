import express from "express";
const router = express.Router();
import { resgistrar, autenticar, confirmar } from "../controllers/usuarioController.js";

//Autenticação, Registo e Confirmação de Users
router.post("/", resgistrar); //Cria um novo user
router.post('/login', autenticar);
router.get('/comfirmar/:token', confirmar);

export default router;