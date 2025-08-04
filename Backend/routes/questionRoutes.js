import express from "express";
const questionRoutes = express.Router();
import {
    createQuestion,
    getQuestionsByQuiz,
    getQuestionById,
    updateQuestion,
    deleteQuestion
} from '../controllers/questionController.js';

questionRoutes.route('/').post(createQuestion);
questionRoutes.route('/by-quiz/:quizId').get(getQuestionsByQuiz);
questionRoutes.route('/:id').get(getQuestionById).put(updateQuestion).delete(deleteQuestion);

export default questionRoutes;