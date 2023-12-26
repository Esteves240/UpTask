import express from "express";
const router = express.Router();
import { resgistrar, autenticar } from "../controllers/usuarioController.js";

//Criação, Registo e Confirmação de Users
router.post("/", resgistrar); //Cria um novo user
router.post('/login', autenticar);

export default router;