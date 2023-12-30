import express from "express";
import conectarDB from "./config/db.js";
import dotenv from "dotenv"; //para ocultar as credênciais da base de dados
import usuarioRoutes from './routes/usuarioRoutes.js';
import proyectoRoutes from './routes/proyectoRoutes.js';
import tareaRoutes from './routes/tareaRoutes.js';
import cors from 'cors';

const app = express();
app.use(express.json());

dotenv.config();

conectarDB();

//Configurar CORS
const whiteList = ['http://localhost:5173'];

const corsOptions = {
    origin: function(origin, callback){
        if(whiteList.includes(origin)){
            //pode consultar a API
            callback(null, true);
        }else{
            //Não tem permissão
            callback(new Error("Erro de Cors!"));
        }
    }
};

//Routing
app.use("/api/usuarios", usuarioRoutes);
app.use("/api/proyectos", proyectoRoutes);
app.use('/api/tareas', tareaRoutes);


const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Servidor iniciado na porta ${PORT}`);
});