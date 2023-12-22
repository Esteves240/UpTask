import express from "express";
import conectarDB from "./config/db.js";
import dotenv from "dotenv"; //para ocultar as credênciais da base de dados

const app = express();

dotenv.config();

conectarDB();

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`Servidor iniciado na porta ${PORT}`);
});