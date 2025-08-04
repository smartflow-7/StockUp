import express from "express";
const ModuleRoutes = express.Router();
import {
    createModule,
    getModules,
    getModuleById,
    updateModule,
    deleteModule
} from '../controllers/moduleController.js';

ModuleRoutes.route('/').post(createModule).get(getModules);
ModuleRoutes.route('/:id').get(getModuleById).put(updateModule).delete(deleteModule);

export default ModuleRoutes;