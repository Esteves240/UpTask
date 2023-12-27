import express from "express";
import conectarDB from "./config/db.js";
import dotenv from "dotenv"; //para ocultar as credênciais da base de dados
import usuarioRoutes from './routes/usuarioRoutes.js'

const app = express();
app.use(express.json());

dotenv.config();

conectarDB();

//Routing
app.use("/api/usuarios", usuarioRoutes);
app.use("/api/proyectos", usuarioRoutes);


const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Servidor iniciado na porta ${PORT}`);
});