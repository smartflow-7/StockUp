const { Quiz } = require('../models/moduleModel');


// Create a new quiz
const createQuiz = async (req, res) => {
    try {
        const { moduleId, title } = req.body;

        if (!moduleId) {
            return res.status(400).json({ message: "Module ID is required" });
        }
        const newQuiz = await Quiz.create({ moduleId, title });
        res.status(201).json({ success: true, quiz: newQuiz });
    } catch (error) {
        console.error("Error creating quiz:", error.message);
        res.status(500).json({ success: false, message: "Failed to create quiz", error: error.message });
    }
}

// Get all quizzes for a module
const getQuizzesByModule = async (req, res) => {
    try {
        const { moduleId } = req.params;
        const quizzes = await Quiz.find({ moduleId }).sort({ createdAt: -1 }).populate('moduleId', 'title');

        if (quizzes.length === 0) {
            return res.status(404).json({ success: false, message: "No quizzes found for this module" });
        }
        res.status(200).json({ success: true, quizzes });
    } catch (error) {
        console.error("Error fetching quizzes:", error.message);
        res.status(500).json({ success: false, message: "Failed to fetch quizzes", error: error.message });
    }
}

// Get a single quiz by ID
const getQuizById = async (req, res) => {
    try {
        const { id } = req.params;
        const quiz = await Quiz.findById(id).populate('moduleId', 'title');

        if (!quiz) {
            return res.status(404).json({ success: false, message: "Quiz not found" });
        }
        res.status(200).json({ success: true, quiz });
    } catch (error) {
        console.error("Error fetching quiz:", error.message);
        res.status(500).json({ success: false, message: "Failed to fetch quiz", error: error.message });
    }
}

// Update a quiz by ID
const updateQuiz = async (req, res) => {
    try {
        const { id } = req.params;
        const { title } = req.body;

        if (!title) {
            return res.status(400).json({ message: "Title is required" });
        }

        const existingQuiz = await Quiz.findById(id);
        if (!existingQuiz) {
            return res.status(404).json({ success: false, message: "Quiz not found" });
        }
        existingQuiz.title = title;
        const updatedQuiz = await existingQuiz.save();
        res.status(200).json({ success: true, quiz: updatedQuiz });
    } catch (error) {
        console.error("Error updating quiz:", error.message);
        res.status(500).json({ success: false, message: "Failed to update quiz", error: error.message });
    }
}

// Delete a quiz by ID
const deleteQuiz = async (req, res) => {
    try {
        const { id } = req.params;
        const existingQuiz = await Quiz.findById(id);
        if (!existingQuiz) {
            return res.status(404).json({ success: false, message: "Quiz not found" });
        }
        await existingQuiz.remove();
        res.status(200).json({ success: true, message: "Quiz deleted successfully" });
    } catch (error) {
        console.error("Error deleting quiz:", error.message);
        res.status(500).json({ success: false, message: "Failed to delete quiz", error: error.message });
    }
}


module.exports = {
    createQuiz,
    getQuizzesByModule,
    getQuizById,
    updateQuiz,
    deleteQuiz
};