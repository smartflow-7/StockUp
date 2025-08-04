import { Module } from '../models/moduleModel.js';


// Create a new module
const createModule = async (req, res) => {
    try {
        const { title, content, image_url, author } = req.body;

        if (!title || !content || !author) {
            return res.status(400).json({ message: "fields are required" });
        }
        const newModule = await Module.create({ title, content, author });
        res.status(201).json({ success: true, module: newModule });
    } catch (error) {
        console.error("Error creating module:", error.message);
        res.status(500).json({ success: false, message: "Failed to create module", error: error.message });
    }
}

// Get all modules
const getModules = async (req, res) => {
    try{
        const modules = await Module.find().sort({ createdAt: -1 });
        res.status(200).json({ success: true, modules });
    } catch (error) {
        console.error("Error fetching modules:", error.message);
        res.status(500).json({ success: false, message: "Failed to fetch modules", error: error.message });
    }
}

// Get a single module by ID
const getModuleById = async (req, res) => {
    try {
        const { id } = req.params;
        const module = await Module.findById(id);
        
        if (!module) {
            return res.status(404).json({ success: false, message: "Module not found" });
        }
        res.status(200).json({ success: true, module });
    } catch (error) {
        console.error("Error fetching module:", error.message);
        res.status(500).json({ success: false, message: "Failed to fetch module", error: error.message });
    }
}

// Update a module by Id
const updateModule = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, content, author } = req.body;

        if (!title || !content || !author) {
            return res.status(400).json({ message: "fields are required" });
        }

        // check if module exist before updating
        const existingModule = await Module.findById(id);
        if (!existingModule) {
            return res.status(404).json({ success: false, message: "Module not found" });
        }
        
        const updatedModule = await Module.findByIdAndUpdate(id, { title, content, author }, { new: true });
        res.status(200).json({ success: true, module: updatedModule });
    } catch (error) {
        console.error("Error updating module:", error.message);
        res.status(500).json({ success: false, message: "Failed to update module", error: error.message });
    }
}


// Delete a module by Id
const deleteModule = async (req, res) => {
    try {
        const { id } = req.params;
        const existingModule = await Module.findById(id);

        if (!existingModule) {
            return res.status(404).json({ success: false, message: "Module not found" });
        }
        await Module.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: "Module deleted successfully" });
    } catch (error) {
        console.error("Error deleting module:", error.message);
        res.status(500).json({ success: false, message: "Failed to delete module", error: error.message });
    }
}

export {
    createModule,
    getModules,
    getModuleById,
    updateModule,
    deleteModule
};