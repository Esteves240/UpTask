import Proyecto from "../models/Proyecto,js";
import Tarea from "../models/Tarea";

const agregarTarea = async (req, res) => {
    const { proyecto } = rec.body;

    //verificar se o projeccto existe
    const existeProyecto = await Proyecto.findById(proyecto);

    //caso o projecto não exista
    if (!existeProyecto) {
        const error = new Error('Projecto inexistente');
        return res.status(404).json({ msg: error.message });
    }

    //comprovar se quem está a aceder, é o criador do projecto
    if (existeProyecto.creador.toString() !== req.usuario._id.toString()) {
        const error = new Error("Não tens permissão para adicionar tarefas");
        return res.status(403).json({ msg: error.message });
    }

    //caso tudo o anterior passe (devolver a tarefa)
    try {
        const tareaAlmacenada = await Tarea.create(req.body);
        res.json(tareaAlmacenada);
    } catch (error) {
        console.log(error)
    }
};

const obtenerTarea = async (req, res) => {
    const { id } = req.params;

    const tarea = await Tarea.findById(id).populate('proyecto');

    //caso a tarefa não exista
    if(!tarea){
        const error = new Error('A tarefa não existe :(');
        return res.status(404).json({msg: error.message});
    }

    //erro para quando não seja o criador a aceder à tarefa
    if (tarea.proyecto.creador.toString() !== req.usuario._id.toString()) {
        const error = new Error("Acção inválida!");
        return res.status(403).json({ msg: error.message });
    }
    
    res.json(tarea);
};

const actualizarTarea = async (req, res) => {};

const eliminarTarea = async (req, res) => {};

const cambiarEstado = async (req, res) => {};

export {
    agregarTarea,
    obtenerTarea,
    actualizarTarea,
    eliminarTarea,
    cambiarEstado
};
