import express from "express";
const optionRoutes = express.Router();
import {
    createOption,
    getOptionsByQuestion,
    getOptionById,
    updateOption,
    deleteOption,
    checkQuestionAnswer
} from '../controllers/optionController.js';

optionRoutes.route('/').post(createOption);
optionRoutes.route('/by-question/:questionId').get(getOptionsByQuestion);
optionRoutes.route('/:id').get(getOptionById).put(updateOption).delete(deleteOption);
optionRoutes.route('/check-answer').post(checkQuestionAnswer); // Route to check question answer

export default optionRoutes;
