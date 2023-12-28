import Proyecto from "../models/Proyecto.js";

const obtenerProyectos = async (req, res) => {
    const proyectos = await Proyecto.find().where('creador').equals(req.usuario);
    res.json(proyectos);
};

const nuevoProyecto = async (req, res) => {
    const proyecto = new Proyecto(req.body)
    proyecto.creador = req.usuario._id

    try {
        const proyectoAlmacenado = await proyecto.save()
        res.json(proyectoAlmacenado);
    } catch (error) {
        console.log(error);
    }
};

const obtenerProyecto = async (req, res) => {
    const { id } = req.params;

    const proyecto = await Proyecto.findById(id);
    
    if (!proyecto){
        const error = new Error("Projecto não encontrado :(");
        return res.status(404).json({msg: error.message});
    }

    //para não poderer ver os projectos caso não seja o criador ou moderador
    if (proyecto.creador.toSrting() !== req.usuario._id.toSrting()){
        const error = new Error("Não tens permissão para aceder a este projeto");
        return res.status(401).json({msg: error.message});
    }

    res.json(proyecto);
};

const editarProyecto = async (req, res) => {};

const eliminarProyecto = async (req, res) => {};

const agregarColaborador = async (req, res) => {};

const eliminarColaborador = async (req, res) => {};

const obtenerTareas = async (req, res) => {};

export {
    obtenerProyectos,
    nuevoProyecto,
    obtenerProyecto,
    editarProyecto,
    eliminarProyecto,
    agregarColaborador,
    eliminarColaborador,
    obtenerTareas
}