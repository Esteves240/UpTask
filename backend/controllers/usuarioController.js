import Usuario from "../models/Usuario.js";

const resgistrar = async (req, res) => {
    //Evitar registos duplicados
    const existeUsuario = await Usuario.findOne({ email: req.body.email });
    
    if(existeUsuario){
        const error = new Error('Usuario já resgistrado');
        return res.status(400).json({ msg: error.message});
    }

    try{
        const usuario = new Usuario(req.body)
        const usuarioAlmacenado = await usuario.save()
        res.json(usuarioAlmacenado);
    }catch (error){
        console.log(error)
    }

    
};


export {
   resgistrar
}