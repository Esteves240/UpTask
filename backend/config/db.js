import mongoose from "mongoose";

const conectarDB = async () =>{
    try {
        const connection = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
            }
        );

      const url =   `${connection.connection.host}:${connection.connection.port}`;
      console.log(`MongoDB conectado em: ${url}`)
    }catch (error){
        console.log(`Erro: ${error.menssage}`);
        process.exit(1); //para reforçar que o processo termine
    }
};

export default conectarDB;