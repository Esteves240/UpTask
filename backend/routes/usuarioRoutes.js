import express from "express";
const router = express.Router();
import { resgistrar } from "../controllers/usuarioController.js";

//Criação, Registo e Confirmação de Users
router.post("/", resgistrar); //Cria um novo user

export default router;