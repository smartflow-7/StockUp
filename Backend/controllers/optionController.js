import { Option, Question } from '../models/moduleModel.js';


// Create a new option
const createOption = async (req, res) => {
    try {
        const { questionId, optionText, label } = req.body;
        
        if (!questionId || !optionText || !label) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const newOption = await Option.create({ questionId, optionText, label });
        res.status(201).json({ success: true, option: newOption });
    } catch (error) {
        console.error("Error creating option:", error.message);
        res.status(500).json({ success: false, message: "Failed to create option", error: error.message });
    }
}


// Get all options for a question
const getOptionsByQuestion = async (req, res) => {
    try {
        const { questionId } = req.params;
        const options = await Option.find({ questionId }).sort({ createdAt: -1 });

        if (options.length === 0) {
            return res.status(404).json({ success: false, message: "No options found for this question" });
        }
        res.status(200).json({ success: true, options });
    } catch (error) {
        console.error("Error fetching options:", error.message);
        res.status(500).json({ success: false, message: "Failed to fetch options", error: error.message });
    }
}

// Get a single option by ID
const getOptionById  = async (req, res) => {
    try {
        const { id } = req.params;
        const option = await Option.findById(id).populate('questionId', 'questionText');

        if (!option) {
            return res.status(404).json({ success: false, message: "Option not found" });
        }
        res.status(200).json({ success: true, option });
    } catch (error) {
        console.error("Error fetching option:", error.message);
        res.status(500).json({ success: false, message: "Failed to fetch option", error: error.message });
    }
}

// Update an option by ID
const updateOption = async (req, res) => {
    try {
        const { id } = req.params;
        const { optionText, label } = req.body;

        if (!optionText || !label) {
            return res.status(400).json({ message: "Option text and label are required" });
        }

        // check if option exists before updating
        const existingOption = await Option.findById(id);
        if (!existingOption) {
            return res.status(404).json({ success: false, message: "Option not found" });
        }

        const updatedOption = await Option.findByIdAndUpdate(id, { optionText, label }, { new: true });
        res.status(200).json({ success: true, option: updatedOption });
    } catch (error) {
        console.error("Error updating option:", error.message);
        res.status(500).json({ success: false, message: "Failed to update option", error: error.message });
    }
}

// Delete an option by ID
const deleteOption = async (req, res) => {
    try {
        const { id } = req.params;
        const existingOption = await Option.findById(id);
        if (!existingOption) {
            return res.status(404).json({ success: false, message: "Option not found" });
        }

        await Option.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: "Option deleted successfully" });
    } catch (error) {
        console.error("Error deleting option:", error.message);
        res.status(500).json({ success: false, message: "Failed to delete option", error: error.message });
    }
}


// Check if the question is correct
const checkQuestionAnswer = async (req, res) => {
    try {
        const { questionId, label } = req.body;

        if (!questionId || !label) {
            return res.status(400).json({ message: "Question ID and label are required" });
        }
        
        // Check if the question exists
        const question = await Question.findById(questionId);
        if (!question) {
            return res.status(404).json({ success: false, message: "Question not found" });
        }

        // Check if the provided answer is correct
        const option = await Option.findOne({ questionId, label })
        if (!option) {
            return res.status(404).json({ success: false, message: "Option not found" });
        }

        if ( option.label === question.correctOption) {
            return res.status(200).json({ success: true, message: "Correct answer" });
        }
        res.status(200).json({ success: false, message: "Incorrect answer" });
    } catch (error) {
        console.error("Error checking question answer:", error.message);
        res.status(500).json({ success: false, message: "Failed to check answer", error: error.message });
    }
}

export {
    createOption,
    getOptionsByQuestion,
    getOptionById,
    updateOption,
    deleteOption,
    checkQuestionAnswer
};