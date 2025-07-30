const express = require('express');
const ModuleRoutes = express.Router();
const {
    createModule,
    getModules,
    getModuleById,
    updateModule,
    deleteModule
} = require('../controllers/moduleController');

ModuleRoutes.route('/').post(createModule).get(getModules);
ModuleRoutes.route('/:id').get(getModuleById).put(updateModule).delete(deleteModule);

module.exports = ModuleRoutes;