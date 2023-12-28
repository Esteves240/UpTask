import express from 'express'
import {
    agregarTarea,
    actualizarTarea,
    eliminarTarea,
    cambiarEstado
} from "../controllers/tareaController.js";
import checkAuth from '../middleware/checkAuth.js';

const router = express.Router();

router.post("/", checkAuth, agregarTarea);
router.route("/:id")
    .put(checkAuth, actualizarTarea)
    .delete(checkAuth, eliminarTarea);

router.post('/estado/:id', checkAuth, cambiarEstado)

export default router;