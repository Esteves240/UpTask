import Proyecto from "../models/Proyecto.js";
import Tarea from "../models/Tarea.js";

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

    //Obter as tarefas do Projecto
    const tareas = await Tarea.find().where('proyecto').equals(proyecto._id);

    res.json({
        proyecto,
        tareas
    });
};

const editarProyecto = async (req, res) => {
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

    proyecto.nombre = req.body.nombre || proyecto.nombre;
    proyecto.descripcion = req.body.descripcion || proyecto.descripcion;
    proyecto.fechaEntrega = req.body.fechaEntrega || proyecto.fechaEntrega;
    proyecto.cliente = req.body.cliente || proyecto.cliente;

    try {
        const proyectoAlmacenado = await proyecto.save();
        res.json(proyectoAlmacenado);
    } catch (error) {
        console.log(error);
    }
};

const eliminarProyecto = async (req, res) => {
    //Identificar o prejecto
    const { id } = req.params;

    //Consultar se está na base de dados
    const proyecto = await Proyecto.findById(id);
    

    //Verificar que o projecto exista
    if (!proyecto){
        const error = new Error("Projecto não encontrado :(");
        return res.status(404).json({msg: error.message});
    }

    //para não poderer ver os projectos caso não seja o criador ou moderador
    if (proyecto.creador.toSrting() !== req.usuario._id.toSrting()){
        const error = new Error("Não tens permissão para aceder a este projeto");
        return res.status(401).json({msg: error.message});
    }

    try {
        await proyecto.deleteOne();
        res.json({ msg: "Projecto eliminado com sucesso! "})
    } catch (error) {
        console.log(error); 
    }
};

const agregarColaborador = async (req, res) => {};

const eliminarColaborador = async (req, res) => {};


export {
    obtenerProyectos,
    nuevoProyecto,
    obtenerProyecto,
    editarProyecto,
    eliminarProyecto,
    agregarColaborador,
    eliminarColaborador
}