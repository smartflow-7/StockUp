const { Question, Option } = require('../models/moduleModel');


// Create a new question
const createQuestion = async (req, res) => {
    try {
        const { quizId, questionText, correctOption } = req.body;

        if (!quizId || !questionText || !correctOption) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const newQuestion = await Question.create({ quizId, questionText, correctOption });
        res.status(201).json({ success: true, question: newQuestion });
    } catch (error) {
        console.error("Error creating question:", error.message);
        res.status(500).json({ success: false, message: "Failed to create question", error: error.message });
    }
}

// Get all questions for a quiz
const getQuestionsByQuiz = async (req, res) => {
    try {
        const { quizId } = req.params;
        const questions = await Question.find({ quizId }).sort({ createdAt: -1 }).populate('quizId', 'title');

        if (questions.length === 0) {
            return res.status(404).json({ success: false, message: "No questions found for this quiz" });
        }

        res.status(200).json({ success: true, questions });
    } catch (error) {
        console.error("Error fetching questions:", error.message);
        res.status(500).json({ success: false, message: "Failed to fetch questions", error: error.message });
    }
}

// Get a single question by ID
const getQuestionById = async (req, res) => {
    try {
        const { id } = req.params;
        const question = await Question.findById(id).populate('quizId', 'title');

        if (!question) {
            return res.status(404).json({ success: false, message: "Question not found" });
        }
        res.status(200).json({ success: true, question });
    } catch (error) {
        console.error("Error fetching question:", error.message);
        res.status(500).json({ success: false, message: "Failed to fetch question", error: error.message });
    }
}

// Update a question by ID
const updateQuestion = async (req, res) => {
    try {
        const { id } = req.params;
        const { questionText, correctOption } = req.body;

        if (!questionText || !correctOption) {
            return res.status(400).json({ message: "Question text and correct option are required" });
        }

        // Check if question exists before updating
        const existingQuestion = await Question.findById(id);
        if (!existingQuestion) {
            return res.status(404).json({ success: false, message: "Question not found" });
        }

        // Update the question
        const updatedQuestion = await Question.findByIdAndUpdate(id, { questionText, correctOption }, { new: true });
        res.status(200).json({ success: true, question: updatedQuestion });
    } catch (error) {
        console.error("Error updating question:", error.message);
        res.status(500).json({ success: false, message: "Failed to update question", error: error.message });
    }
}

// Delete a question by ID
const deleteQuestion = async (req, res) => {
    try {
        const { id } = req.params;
        const existingQuestion = await Question.findById(id);
        if (!existingQuestion) {
            return res.status(404).json({ success: false, message: "Question not found" });
        }
        await Question.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: "Question deleted successfully" });
    } catch (error) {
        console.error("Error deleting question:", error.message);
        res.status(500).json({ success: false, message: "Failed to delete question", error: error.message });
    }
}

module.exports = {
    createQuestion,
    getQuestionsByQuiz,
    getQuestionById,
    updateQuestion,
    deleteQuestion
};