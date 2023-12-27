import Usuario from "../models/Usuario.js";
import generarId from "../helpers/generarId.js";
import generarJWT from "../helpers/generarJWT.js";

const resgistrar = async (req, res) => {
    //Evitar registos duplicados
    const existeUsuario = await Usuario.findOne({ email: req.body.email });
    
    if(existeUsuario){
        const error = new Error('Usuario já resgistrado');
        return res.status(400).json({ msg: error.message});
    }

    try{
        const usuario = new Usuario(req.body);
        usuario.token = generarId();
        const usuarioAlmacenado = await usuario.save();
        res.json(usuarioAlmacenado);
    }catch (error){
        console.log(error)
    } 
};


const autenticar = async (req, res) => {
    const {email, password} = req.body

    //Comprovar se o user existe
    const usuario = await Usuario.findOne({ email });
    if (!usuario) {
        const error = new Error("O usuario não está registrado");
        return res.status(404).json({ msg: error.message });
    }
    //Comprovar se o user está confirmado
    if (!usuario.confirmado) {
        const error = new Error("A tua conta não foi confirmada");
        return res.status(403).json({ msg: error.message });
    }
    //Comprovar password
    if (await usuario.comprobarPassword(password)){
        res.json({
            _id: usuario._id,
            nombre: usuario.nombre,
            email: usuario.email,
            token: generarJWT(usuario._id)
        });
    }else {
        const error = new Error("Password incorreta");
        return res.status(403).json({ msg: error.message });
    }
};

const confirmar = async (req, res) => {
    const { token } = req.params;
    const usuarioConfirmar = await Usuario.findOne({token});
    if (!usuarioConfirmar){
        const error = new Error("Token inválido!");
        return res.status(403).json({ msg: error.message });
    }

    try {
        usuarioConfirmar.confirmado = true;
        usuarioConfirmar.token = "";
        await usuarioConfirmar.save();
        res.json({msg: 'Usuário confirmado com sucesso!'})
    } catch (error) {
        console.log(error);
    }
};

const olvidePassword = async (req, res) => {
    const { email } = req.body;
    const usuario = await Usuario.findOne({ email });
    if (!usuario) {
        const error = new Error("O usuario não está registrado");
        return res.status(404).json({ msg: error.message });
    }

    try {
        usuario.token = generarId();
        await usuario.save();
        res.json({ msg: "Foi enviado um email para restaurar a sua palavra-passe."});
    } catch (error){
        console.log(error)
    }
};

const comprobarToken = async (req,res) => {
    const { token } = req.params;

    const tokenValido = await Usuario.findOne({ token });

    if (tokenValido){
        res.json({msg:'Token válido, usuário já existente.'})
    }else{
        const error = new Error("Token inváido!");
        return res.status(404).json({ msg: error.message });
    }
}

export {
   resgistrar,
   autenticar,
   confirmar,
   olvidePassword,
   comprobarToken
};